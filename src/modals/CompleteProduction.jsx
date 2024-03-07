import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useOrders } from "@/store/hooks/apps";
import { useUser } from "@/store/hooks/user";

import { calculateAverageType } from "@/utils/apps";

import { editOrder } from "@/store/actions/apps";

import { updateSomeOrderInDB } from "@/services/order";

import FormikForm from "@/components/FormikForm";

const CompleteProduction = ({ closeModal, order_id, recipe_id, product }) => {
  console.log("product CompleteProduction", product);

  const user = useUser();
  const orders = useOrders();
  const [error, setError] = useState("");

  const { t } = useTranslation();

  const formValues = {
    // production: {
    //   tag: "input",
    //   type: "number",
    //   placeholder: t("production"),
    //   label: t("production"),
    //   value: product.production.kg_quantity ?? 0,
    //   min: 1,
    // },
  };

  // const validate = (values) => {
  //   const errors = {};
  //   if (!values.production) errors.production = "Required";

  //   return errors;
  // };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setError("");
      setSubmitting(true);
      console.log(values, "values");

      const producedQuantity = values.production;

      const selectedOrder = orders.find((order) => order.order_id === order_id);
      const orderProducts = JSON.parse(JSON.stringify(selectedOrder.products));

      for (const key in orderProducts) {
        if (orderProducts[key].recipe_id === product.recipe_id) {
          const producingStatusIndex = orderProducts[key].orderStatus.findIndex(
            (status) => status.recipe_id === product.production.recipe_id
          );

          //üretildi status e miktar eklendi
          if (producingStatusIndex !== -1) {
            console.log("üretildi 1st if");
            orderProducts[key].orderStatus[producingStatusIndex].type =
              "Üretildi";
            // orderProducts[key].orderStatus[producingStatusIndex].kg_quantity =producedQuantity;
          }
        }

        console.log("product in complete production:: guss0", product);
        console.log("orderProducts:: guss0", orderProducts);

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

        const updateOrderResponse = await updateSomeOrderInDB(
          user.tokens.access_token,
          order_id,
          {
            products: orderProducts,
            // total_cost: parseFloat(allCost),
            order_status: orderStatus,
          }
        )
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
          });

        editOrder(updateOrderResponse);
        closeModal();
        setSubmitting(false);
      }
    } catch (error) {
      setError(error);
      setSubmitting(false);

      console.error("Error in executing promises:", error);
    }
  };

  return (
    <>
      <FormikForm
        key={JSON.stringify(formValues)}
        className={"flex flex-row"}
        onSubmit={onSubmit}
        // validate={validate}
        initialValues={formValues}
        // error={error}
        text="Onayla"
        title={"Üretimi Onayla"}
        subtitle={
          "Üretimin tamamlanması için vardiya ekleme işleminin yapılmış olması gerekiyor!"
        }
        // recipe={true}
        // product={product}

        // recipeName={recipeName}
        // setRecipeName={setRecipeName}
        // setSelectedSpecialRecipe={setSelectedSpecialRecipe}
        // specialRecipes={specialRecipes}
        // selectedSpecialRecipe={selectedSpecialRecipe}
        // exceededStocks={exceededStocks}
        // checkedRecipes={checkedRecipes}
        // recipe_id={recipe_id}
      />
    </>
  );
};

export default CompleteProduction;
