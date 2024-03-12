import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useOrders, useSpecialRecipes } from "@/store/hooks/apps";
import { useUser } from "@/store/hooks/user";
import {
  addSpecialRecipeToDB,
  addProductionRecipeToDB,
} from "@/services/recipe";
import { calculateAverageType } from "@/utils/apps";
import { v4 as uuidv4 } from "uuid";
import { updateRecipeMaterialStocksInProductionToDB } from "@/services/recipematerialstocks";
import {
  addProductionRecipe,
  addSpecialRecipe,
  editOrder,
} from "@/store/actions/apps";
import { useRecipeMaterialStocks, useRecipes } from "@/store/hooks/apps";
import { recipeCost } from "@/utils/costHelpers";
import { updateSomeOrderInDB } from "@/services/order";
import getExceededStock from "@/utils/exceededStocks";
import getTotalRecipeKG from "@/utils/getTotalRecipeKG";
import SendToProductionForm from "@/components/FormikForm/SendToProductionForm";

const SendToProduction = ({
  closeModal,
  order_id,
  recipe_id,
  product,
  checkedRecipes,
}) => {
  console.log("product in SendToProduction", product);
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

  const selectedRecipe = recipes.find((recipe) => recipe.id === recipe_id);

  const [otherInputs, setOtherInputs] = useState({
    wastage_percentage: parseInt(selectedRecipe?.wastage_percentage * 100) ?? 1,
    total_bunker: selectedRecipe?.total_bunker ?? 1,
    total_production: 1,
  });

  const formValues = useMemo(() => {
    const initialValues = {};
    recipeMaterials?.forEach((row) => {
      initialValues[String(row.id)] = {
        id: row.id,
        name: row.product_name,
        label: row.product_name,
        tag: "input",
        type: "number",
        stock: row.quantity,
        placeholder: "Miktar girin (kg)",
        value: selectedSpecialRecipe
          ? JSON.parse(selectedSpecialRecipe)[row.id.toString()]
          : selectedRecipe?.details[row.id] ?? "",
        min: 0,
      };
    });
    return initialValues;
  }, [selectedSpecialRecipe, selectedRecipe]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setError("");
      setSubmitting(true);
      setExceededStocks(null);
      const promises = [];
      let allCost = 0;
      let addRecipeResponse,
        updateOrderResponse,
        updateStockResponse,
        saveRecipeResponse;

      const selectedOrder = orders.find((order) => order.order_id === order_id);
      const orderProducts = JSON.parse(JSON.stringify(selectedOrder.products));

      for (const key in orderProducts) {
        if (orderProducts[key].recipe_id === recipe_id) {
          const totalStatusQuantity = orderProducts[key].orderStatus.find(
            (status) => status.type === "Alındı"
          )?.quantity;

          console.log(totalStatusQuantity, "tottt");

          if (totalStatusQuantity === undefined) {
            return setError("Hata! Üretilecek miktar kalmadı");
          }

          if (totalStatusQuantity < otherInputs.total_production) {
            return setError(
              `Hata! Fazla kg miktarı girdiniz. Üretilecek kalan miktar: ${totalStatusQuantity} kg`
            );
          }
        }
      }

      const exceededStockValue = getExceededStock(
        values,
        recipeMaterials,
        otherInputs?.total_bunker
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

      const productionRecipeId = uuidv4();

      const data = {
        id: productionRecipeId,
        order_id: order_id,
        product_id: product.product_id,
        attributes: product.attributedetails,
        details: values,
        cost: cost,
        unit_bunker_cost: cost,
        total_bunker_cost: parseFloat(cost * otherInputs.total_bunker),
        recipe_id: recipe_id,
        wastage_percentage: parseFloat(otherInputs.wastage_percentage / 100),
        total_bunker: otherInputs.total_bunker,
        total_kg: otherInputs.total_production,
        status: "Üretiliyor",
        date: new Date().toISOString(),
      };

      for (const key in orderProducts) {
        if (orderProducts[key].recipe_id === recipe_id) {
          const receivedStatusIndex = orderProducts[key].orderStatus.findIndex(
            (status) => status.type === "Alındı"
          );

          // Update the quantity for "Alındı" status type
          if (receivedStatusIndex !== -1) {
            orderProducts[key].orderStatus[receivedStatusIndex].quantity -=
              otherInputs.total_production;
          }
          // Add a new "Üretiliyor" status to the orderStatus array
          // orderProducts[key].orderStatus.push({
          //   recipe_id: productionRecipeId,
          //   quantity: otherInputs.total_production,
          //   type: "Üretiliyor",
          //   bunker_quantity: otherInputs?.total_bunker,
          //   kg_quantity: otherInputs?.total_production,
          // });

          orderProducts[key].orderStatus = orderProducts[
            key
          ].orderStatus.concat({
            recipe_id: productionRecipeId,
            quantity: otherInputs.total_production,
            type: "Üretiliyor",
            bunker_quantity: otherInputs?.total_bunker,
            kg_quantity: otherInputs?.total_production,
          });
          if (typeof orderProducts[key]["productionRecipes"] === "undefined") {
            orderProducts[key]["productionRecipes"] = [];
          }

          orderProducts[key]["productionRecipes"] = orderProducts[key][
            "productionRecipes"
          ].concat({
            id: productionRecipeId,
            bunker_quantity: otherInputs?.total_bunker,
            kg_quantity: otherInputs?.total_production,
          });
        }

        // allCost += parseFloat(orderProducts[key].totalCost);
      }

      const orderStatusNumber = calculateAverageType({
        products: orderProducts,
        sets: [],
      });

      const orderStatus =
        orderStatusNumber === 0
          ? "İş Alındı"
          : orderStatusNumber === 3
          ? "İş Tamamen Bitti"
          : "Hazırlıklar Başladı";

      console.log("orderProducts______", orderProducts);

      // Push the promise to the array
      promises.push(
        addProductionRecipeToDB(user.tokens.access_token, data)
          .then((response) => {
            if (response?.error) {
              console.log(response.error);
              setError(response.error);
            }
            return response;
          })
          .catch((error) => {
            console.error("Error in addProductionRecipeToDB:", error);
            throw error;
          })
      );

      promises.push(
        updateSomeOrderInDB(user.tokens.access_token, order_id, {
          products: orderProducts,
          // total_cost: parseFloat(allCost),
          order_status: orderStatus,
        })
          .then((response) => {
            if (response?.error) {
              console.log(response.error);
              setError(response.error);
            }
            return response;
          })
          .catch((error) => {
            console.error("Error in updateSomeOrderInDB:", error);
            throw error;
          })
      );

      // stok düşme işlemi yap
      //burası sonra state e eklenecek
      promises.push(
        updateRecipeMaterialStocksInProductionToDB(
          user.tokens.access_token,
          productionRecipeId
        )
          .then((response) => {
            if (response?.error) {
              console.log(response.error);
              setError(response.error);
            }
            return response;
          })
          .catch((error) => {
            console.error(
              "Error in updateRecipeMaterialStocksInProductionToDB:",
              error
            );
            throw error;
          })
      );

      if (saveRecipe) {
        const data = {
          details: values,
          name: recipeName,
        };
        // Push the promise to the array
        promises.push(
          addSpecialRecipeToDB(user.tokens.access_token, data)
            .then((response) => {
              if (response?.error) {
                setError(response.error);
              }
              return response;
            })
            .catch((error) => {
              console.error("Error in addRecipeToDB:", error);
              throw error;
            })
        );
      }

      if (saveRecipe) {
        [
          addRecipeResponse,
          updateOrderResponse,
          updateStockResponse,
          saveRecipeResponse,
        ] = await Promise.all(promises);
      } else {
        [addRecipeResponse, updateOrderResponse, updateStockResponse] =
          await Promise.all(promises);
      }

      console.log("addRecipeResponse", addRecipeResponse);
      addProductionRecipe(addRecipeResponse);
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
        title={"Üretim Bilgilerini Düzenle"}
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

export default SendToProduction;
