import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useOrders, useSpecialRecipes } from "@/store/hooks/apps";
import { useUser } from "@/store/hooks/user";
import {
  addRecipeToDB,
  editRecipeToDB,
  addSpecialRecipeToDB,
} from "@/services/recipe";
import {
  addRecipe,
  addSpecialRecipe,
  editOrder,
  editRecipe,
} from "@/store/actions/apps";
import { useRecipeMaterialStocks, useRecipes } from "@/store/hooks/apps";
import { recipeCost } from "@/utils/costHelpers";
import { updateSomeOrderInDB } from "@/services/order";
import RecipeForm from "@/components/FormikForm/RecipeForm";
import useExceededStocks from "@/hooks/useExceededStocks";
import getExceededStock from "@/utils/exceededStocks";
import getTotalRecipeKG from "@/utils/getTotalRecipeKG";
import SendToProductionForm from "@/components/FormikForm/SendToProductionForm";

const SendToMergedProduction = ({
  closeModal,
  order_id,
  recipe_id,
  product,
  checkedRecipes
}) => {
  const specialRecipes = useSpecialRecipes();
  const recipeMaterials = useRecipeMaterialStocks();
  const recipes = useRecipes();
  const orders = useOrders();
  const user = useUser();
  const [error, setError] = useState("");
  const [saveRecipe, setSaveRecipe] = useState(false);
  const [exceededStocks, setExceededStocks] = useState(null);

  const [recipeName, setRecipeName] = useState("");
  const [selectedSpecialRecipe, setSelectedSpecialRecipe] = useState(null);
  const { t } = useTranslation();


//   const [otherInputs, setOtherInputs] = useState({
//     wastage_percentage: selectedRecipe?.wastage_percentage ?? 1,
//     total_bunker: selectedRecipe?.total_bunker ?? 1,
//     production_amount: 1
//   });
const [otherInputs, setOtherInputs] = useState([]);

  const formValues = useMemo(() => {
    const initialValues = {};
    recipeMaterials?.forEach((row) => {
      initialValues[String(row.id)] = {
        id: row.id,
        name: row.material,
        label: row.material,
        tag: "input",
        type: "number",
        stock: row.stock,
        placeholder: "Miktar girin (kg)",
        value: selectedSpecialRecipe
          ? JSON.parse(selectedSpecialRecipe)[row.id.toString()]
          :  "",
        min: 0,
      };
    });
    return initialValues;
  }, [selectedSpecialRecipe]);

  const onSubmit = async (values, { setSubmitting }) => {
    setError("");
    setSubmitting(true);
    setExceededStocks(null);
    // console.log(
    //   "otherInputs.total_bunker submit:::",
    //   otherInputs.total_bunker,
    //   typeof otherInputs.total_bunker
    // );


    if(checkedRecipes.length>=2 && checkedRecipes.includes(recipe_id)){
        //burada birleştirme yapılacak

    }


    const exceededStockValue = getExceededStock(
      values,
      recipeMaterials,
      otherInputs.total_bunker
    );
    console.log(exceededStockValue, "exceededStockValue");
    if (
      exceededStockValue !== null &&
      Object.keys(exceededStockValue).length !== 0
    ) {
      setSubmitting(false);
      setExceededStocks(exceededStockValue);
      return setError(t("exceedsStockError"));
    }

    const total_recipe_kg = getTotalRecipeKG(values);
    if (total_recipe_kg < 1500 || total_recipe_kg > 2400) {
      return setError(
        t("totalRecipeKGError") +
          t("totalRecipeInputKG") +
          ": " +
          total_recipe_kg +
          " kg"
      );
    }

    if (saveRecipe && recipeName === "") {
      return setError(t("recipeNameError"));
    }
    let saveRecipePromise;
    if (saveRecipe) {
      const data = {
        details: values,
        name: recipeName,
      };
      saveRecipePromise = addSpecialRecipeToDB(user.tokens.access_token, data)
        .then((response) => {
          if (response?.error) {
            setError(response.error);
          }
          return response;
        })
        .catch((error) => {
          console.error("Error in addRecipeToDB:", error);
          throw error;
        });
    }
    const cost = recipeCost(values, recipeMaterials);
    const data = {
      order_id: order_id,
      details: values,
      cost: cost,
      unit_bunker_cost: cost,
      total_bunker_cost: parseFloat(cost * otherInputs.total_bunker).toFixed(2),
      recipe_id: recipe_id,
      wastage_percentage: otherInputs.wastage_percentage,
      total_bunker: otherInputs.total_bunker,
    };

    const addRecipePromise = addRecipeToDB(user.tokens.access_token, data)
      .then((response) => {
        if (response?.error) {
          console.log(response.error);
          setError(response.error);
        }
        return response;
      })
      .catch((error) => {
        console.error("Error in addRecipeToDB:", error);
        throw error;
      });

    const selectedOrder = orders.find((order) => order.order_id === order_id);
    console.log("selectedOrder", selectedOrder);

    const orderProducts = JSON.parse(JSON.stringify(selectedOrder.products));
    let allCost = 0;
    for (const key in orderProducts) {
      if (orderProducts[key].recipe_id === recipe_id) {
        orderProducts[key].unitCost = data.unit_bunker_cost; //cost; //burada ürüne ait recipe cost birim bunker olarak ekleniyor
        orderProducts[key].totalCost = data.total_bunker_cost; //cost * orderProducts[key].quantity; ///burada ürüne ait total recipe cost total bunker olarak ekleniyor
      } // en son da siparişe ait total recipe cost hesaplanıp tabloya total_cost olarak ekleniyor
      allCost += parseFloat(orderProducts[key].totalCost);
    }
    const updateOrderPromise = updateSomeOrderInDB(
      user.tokens.access_token,
      order_id,
      {
        products: orderProducts,
        total_cost: parseFloat(allCost),
      }
    ).catch((error) => {
      console.error("Error in updateOrderInDB:", error);
      setError(error);
      throw error;
    });

    try {
      const [addRecipeResponse, updateOrderResponse, saveRecipeResponse] =
        await Promise.all([
          addRecipePromise,
          updateOrderPromise,
          saveRecipePromise,
        ]);
      setSubmitting(false);
      addRecipe(addRecipeResponse);
      console.log("saveRecipe1", saveRecipe);
      if (saveRecipe) {
        console.log("saveRecip2", saveRecipe);
        console.log("saveRecipeResponse", saveRecipeResponse);
        addSpecialRecipe(saveRecipeResponse);
      }
      // saveRecipe && addSpecialRecipe(saveRecipeResponse);
      editOrder(updateOrderResponse);
      closeModal();
    } catch (error) {
      setError(error);
      console.error("Error in executing promises:", error);
    }
  };

  const onEdit = async (values, { setSubmitting }) => {
    setError("");
    setExceededStocks(null);
    setSubmitting(true);
    // console.log(
    //   "otherInputs.total_bunker:::",
    //   otherInputs.total_bunker,
    //   typeof otherInputs.total_bunker
    // );
    const exceededStockValue = getExceededStock(
      values,
      recipeMaterials,
      otherInputs.total_bunker
    );

    if (
      exceededStockValue !== null &&
      Object.keys(exceededStockValue).length !== 0
    ) {
      setSubmitting(false);
      setExceededStocks(exceededStockValue);
      return setError(t("exceedsStockError"));
    }

    const total_recipe_kg = getTotalRecipeKG(values);
    if (total_recipe_kg < 1500 || total_recipe_kg > 2400) {
      return setError(
        t("totalRecipeKGError") +
          t("totalRecipeInputKG") +
          ": " +
          total_recipe_kg +
          " kg"
      );
    }
    if (saveRecipe && recipeName === "") {
      return setError(t("recipeNameError"));
    }

    const cost = recipeCost(values, recipeMaterials);
    const data = {
      details: values,
      cost: cost,
      unit_bunker_cost: cost,
      total_bunker_cost: (cost * otherInputs.total_bunker).toFixed(2),
      recipe_id: recipe_id,
      wastage_percentage: parseInt(otherInputs.wastage_percentage),
      total_bunker: parseInt(otherInputs.total_bunker),
    };

    let saveRecipePromise;
    if (saveRecipe) {
      const data = {
        details: values,
        name: recipeName,
      };
      saveRecipePromise = addSpecialRecipeToDB(user.tokens.access_token, data)
        .then((response) => {
          if (response?.error) {
            setError(response.error);
          }
          return response;
        })
        .catch((error) => {
          console.error("Error in addRecipeToDB:", error);
          throw error;
        });
    }

    const updateRecipePromise = editRecipeToDB(user.tokens.access_token, data)
      .then((response) => {
        if (response?.error) {
          setError(response.error);
        }
        return response;
      })
      .catch((error) => {
        console.error("Error in addRecipeToDB:", error);
        setError(error);
        throw error;
      });

    const selectedOrder = orders.find((order) => order.order_id === order_id);
    console.log("selectedOrder", selectedOrder);
    const orderProducts = JSON.parse(JSON.stringify(selectedOrder.products));
    let allCost = 0;
    for (const key in orderProducts) {
      if (orderProducts[key].recipe_id === recipe_id) {
        orderProducts[key].unitCost = parseFloat(data.unit_bunker_cost).toFixed(
          2
        ); // cost;
        orderProducts[key].totalCost = parseFloat(
          data.total_bunker_cost
        ).toFixed(2); //cost * orderProducts[key].quantity;
      }
      allCost += parseFloat(orderProducts[key].totalCost);
    }
    console.log("type of order id", typeof order_id);
    const updateOrderPromise = updateSomeOrderInDB(
      user.tokens.access_token,
      order_id,
      {
        products: orderProducts,
        total_cost: allCost,
      }
    ).catch((error) => {
      console.error("Error in updateOrderInDB:", error);
      setError(error);
      throw error;
    });

    try {
      const [updateRecipeResponse, updateOrderResponse, saveRecipeResponse] =
        await Promise.all([
          updateRecipePromise,
          updateOrderPromise,
          saveRecipePromise,
        ]);
      editRecipe(updateRecipeResponse);
      editOrder(updateOrderResponse);
      if (saveRecipe) {
        addSpecialRecipe(saveRecipeResponse);
      }
      setSubmitting(false);
      closeModal();
    } catch (error) {
      setError(error);
      console.error("Error in executing promises:", error);
    }
  };

  return (
    <>
      <SendToProductionForm
        key={JSON.stringify(formValues)}
        className={"flex flex-row"}
        onSubmit={onSubmit}
        //validate={validate}
        setOtherInputs={setOtherInputs}
        otherInputs={otherInputs}
        initialValues={formValues}
        error={error}
        title={
         "Üretim Bilgilerini Düzenle"
        }
        recipe={true}
        product={product}
        saveRecipe={saveRecipe}
        setSaveRecipe={setSaveRecipe}
        recipeName={recipeName}
        setRecipeName={setRecipeName}
        setSelectedSpecialRecipe={setSelectedSpecialRecipe}
        specialRecipes={specialRecipes}
        selectedSpecialRecipe={selectedSpecialRecipe}
        exceededStocks={exceededStocks}
        checkedRecipes={checkedRecipes}
        recipe_id={recipe_id}
      />
    </>
  );
};

export default SendToMergedProduction;
