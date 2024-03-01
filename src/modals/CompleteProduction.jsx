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
    production: {
      tag: "input",
      type: "number",
      placeholder: t("production"),
      label: t("production"),
      value: product.production.kg_quantity ?? 0,
      min: 1,
    },
  };

  const validate = (values) => {
    const errors = {};
    if (!values.production) errors.production = "Required";

    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setError("");
      setSubmitting(true);
      console.log(values, "values");

      const receivedQuantity = product.orderStatus.find(
        (status) => status.type === "Alındı"
      ).quantity;
      const producingQuantity = product.production.quantity;

      const remainingTotal = producingQuantity + receivedQuantity;
      console.log("remainingTotal", remainingTotal);
      //yani sipariş
      if (values.production > remainingTotal) {
        return setError(
          "Hata! Üretilen miktar kalan sipariş miktarından büyük olamaz."
        );
      }

      const finalReceivedQuantity = remainingTotal - values.production;
      const producedQuantity = values.production;

      const selectedOrder = orders.find((order) => order.order_id === order_id);
      const orderProducts = JSON.parse(JSON.stringify(selectedOrder.products));

      for (const key in orderProducts) {
        if (orderProducts[key].recipe_id === product.recipe_id) {
          const receivedStatusIndex = orderProducts[key].orderStatus.findIndex(
            (status) => status.type === "Alındı"
          );
          const producingStatusIndex = orderProducts[key].orderStatus.findIndex(
            (status) => status.recipe_id === product.production.recipe_id
          );

          const producedStatusIndex = orderProducts[key].orderStatus.findIndex(
            (status) => status.type === "Üretildi"
          );

          // Alındı durumu miktarı güncellendi
          if (receivedStatusIndex !== -1) {
            orderProducts[key].orderStatus[receivedStatusIndex].quantity -=
              finalReceivedQuantity;
          }

          //üretildi status e miktar eklendi
          if (producedStatusIndex !== -1) {
            console.log("üretildi 1st if");
            orderProducts[key].orderStatus[producedStatusIndex].quantity +=
              producedQuantity;
          } else {
            console.log("üretildi else ");
            orderProducts[key].orderStatus.push({
              type: "Üretildi",
              quantity: producedQuantity,
              recipe_id: product.production.recipe_id,
              kg_quantity: product.production.kg_quantity,
              bunker_quantity: product.production.bunker_quantity,
            });
          }

          // üretiliyor silindi
          if (producingStatusIndex !== -1) {
            delete orderProducts[key].orderStatus[producingStatusIndex];
          }
        }

        console.log("orderProducts::", orderProducts);

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
        validate={validate}
        initialValues={formValues}
        error={error}
        title={"Üretimi Bitir"}
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
