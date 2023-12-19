import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useOrders } from "@/store/hooks/apps";
import { useUser } from "@/store/hooks/user";
import {
  addRecipeToDB,
  delRecipeFromDB,
  editRecipeToDB,
} from "@/services/recipe";
import {
  addOrder,
  addRecipe,
  delProduct,
  editOrder,
  editProduct,
  editRecipe,
} from "@/store/actions/apps";
import { mergeDeep } from "@/utils/helpers";

import FormikForm from "@/components/FormikForm";
import { useRecipeMaterials, useRecipes } from "@/store/hooks/apps";
import { recipeCost } from "@/utils/costHelpers";
import { updateSomeOrderInDB } from "@/services/order";

const CreateRecipe = ({
  closeModal,
  order_id,
  recipe_id,
  isFilled,
  product,
}) => {
  const recipeMaterials = useRecipeMaterials();
  const recipes = useRecipes();
  const orders = useOrders();
  const user = useUser();
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const selectedRecipe = recipes.find((recipe) => recipe.id === recipe_id);

  const initialValues2 = {};

  recipeMaterials?.forEach((row) => {
    initialValues2[String(row.id)] = {
      id: row.id,
      name: row.material,
      label:row.material ,
      tag: "input",
      type: "number",
      placeholder: "Miktar girin (kg)",
      value: selectedRecipe?.details[row.id] ?? "",
      min: 0,
    };
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setError("");
    const cost = recipeCost(values, recipeMaterials);

    const data = {
      order_id: order_id,
      details: values,
      cost: cost,
      recipe_id: recipe_id,
    };

    const addRecipePromise = addRecipeToDB(user.tokens.access_token, data)
      .then((response) => {
        if (response?.error) {
          console.log(response);
          setError(response.error);
        }
        return response;
      })
      .catch((error) => {
        console.error("Error in addRecipeToDB:", error);
        // Handle error if needed
        throw error;
      });

    const selectedOrder = orders.find((order) => order.order_id === order_id);

    const orderProducts = JSON.parse(JSON.stringify(selectedOrder.products));
    let allCost = 0;
    for (const key in orderProducts) {
      if (orderProducts[key].recipe_id === recipe_id) {
        orderProducts[key].unitCost = cost / orderProducts[key].quantity;
        orderProducts[key].totalCost = cost;
      }
      allCost += orderProducts[key].totalCost;
    }
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
      // Handle error if needed
      throw error;
    });

    // Execute both promises concurrently using Promise.all
    try {
      const [addRecipeResponse, updateOrderResponse] = await Promise.all([
        addRecipePromise,
        updateOrderPromise,
      ]);
      setSubmitting(false);
      addRecipe(addRecipeResponse);
      editOrder(updateOrderResponse);
      closeModal();

      // Work with addRecipeResponse and updateOrderResponse here
      console.log("addRecipeResponse:", addRecipeResponse);
      console.log("updateOrderResponse:", updateOrderResponse);
    } catch (error) {
      setError(error);
      console.error("Error in executing promises:", error);
    }
  };

  const onEdit = async (values, { setSubmitting }) => {
    setError("");
    const cost = recipeCost(values, recipeMaterials);
    const data = {
      details: values,
      cost: cost,
      recipe_id: recipe_id,
    };

    const updateRecipePromise = editRecipeToDB(user.tokens.access_token, data)
      .then((response) => {
        if (response?.error) {
          console.log(response);
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
    const total_cost = selectedOrder.products.length * cost;

    const orderProducts = JSON.parse(JSON.stringify(selectedOrder.products));
    let allCost = 0;
    for (const key in orderProducts) {
      if (orderProducts[key].recipe_id === recipe_id) {
        orderProducts[key].unitCost = cost / orderProducts[key].quantity;
        orderProducts[key].totalCost = cost;
      }
      allCost += orderProducts[key].totalCost;
    }

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
      // Handle error if needed
      throw error;
    });

    try {
      const [updateRecipeResponse, updateOrderResponse] = await Promise.all([
        updateRecipePromise,
        updateOrderPromise,
      ]);
      editRecipe(updateRecipeResponse);
      editOrder(updateOrderResponse);
      setSubmitting(false);
      closeModal();
    } catch (error) {
      setError(error);
      console.error("Error in executing promises:", error);
    }
  };

  return (
    <>
      <FormikForm
        className={"flex flex-row"}
        onSubmit={isFilled ? onEdit : onSubmit}
        //   validate={validate}
        initialValues={initialValues2}
        error={error}
        title={
          isFilled ? "Reçete Bilgilerini Düzenle" : "Reçete Bilgilerini Ekle"
        }
        recipe={true}
        product={product}
        //   {t(selectedProduct ? (!!type ? 'editOtherProduct' : 'editProduct') : !!type ? 'addOtherProduct' : 'addProduct')}
      />
      {/* {selectedProduct && (
              <button
                  className='py-2 px-3 bg-danger hover:bg-alert-danger-fg-light transition-colors text-white w-full mt-4 rounded'
                  onClick={onDelete}
              >
                  {t('delete')}
              </button>
          )} */}
    </>
  );
};

export default CreateRecipe;
