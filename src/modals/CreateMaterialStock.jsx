import FormikForm from "@/components/FormikForm";
import {
  addRecipeMaterialLogToDB,
  editRecipeMaterialLogToDB,
  editRecipeMaterialToDB,
} from "@/services/recipematerial";
import { editRecipeMaterial } from "@/store/actions/apps";
import { useUser } from "@/store/hooks/user";
import { dateToIsoFormatWithTimezoneOffset } from "@/utils/helpers";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecipeMaterials } from "@/store/hooks/apps";
import {
  addRecipeMaterialLog,
  editRecipeMaterialLog,
} from "@/store/actions/apps";

const CreateMaterialStock = ({ closeModal, editing = false, selected }) => {
  const user = useUser();
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const recipeMaterialStocks = useRecipeMaterials();

  const initialValues = {
    item_id: {
      tag: "select",
      label: t("productname"),
      value: editing ? selected.item_id : 0,
      readOnly: editing,
      options: (() => {
        const initialOptions = [
          {
            key: 0,
            value: t("choose"),
          },
        ];

        const changedProducts = recipeMaterialStocks.map((item) => ({
          key: item.id,
          value: item.material,
        }));

        return initialOptions.concat(changedProducts);
      })(),
    },
    quantity: {
      tag: "input",
      type: "number",
      placeholder: t("materialstock"),
      label: t("materialstock"),
      value: editing ? selected.quantity : 0,
      min: 0,
    },
    price: {
      tag: "input",
      type: "number",
      placeholder: t("buyingprice"),
      label: t("buyingprice"),
      value: editing ? selected.price : 0,
      min: 0,
    },
    date: {
      tag: "input",
      type: "date",
      label: t("date"),
      value: editing
        ? dateToIsoFormatWithTimezoneOffset(new Date(selected.date))
        : dateToIsoFormatWithTimezoneOffset(new Date()),
      readOnly: editing,
      max: dateToIsoFormatWithTimezoneOffset(new Date()),
    },
  };

  const validate = (values) => {
    const errors = {};
    if (!values.item_id) errors.product_id = "Required";
    if (!values.quantity) errors.stock = "Required";
    if (!values.price) errors.cost = "Required";

    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setError("");
    setSubmitting(true);
    values.last_edited_by = user.userid;

    const addRecipeMaterialLogPromise = addRecipeMaterialLogToDB(
      user.tokens.access_token,
      values
    ).catch((error) => {
      console.error("Error in addRecipeMaterialLogToDB:", error);
      setError(error);
      throw error;
    });

    const currentStock = recipeMaterialStocks.find((stock) => {
      return stock.id === parseInt(values.item_id);
    });

    const stockdata = {
      stock: currentStock.stock + values.quantity,
      cost: (
        (currentStock.cost * currentStock.stock +
          values.price * values.quantity) /
        (values.quantity + currentStock.stock)
      ).toFixed(2),
    };

    const editStockPromise = editRecipeMaterialToDB(
      user.tokens.access_token,
      stockdata,
      values.item_id
    ).catch((error) => {
      console.error("Error in editRecipeMaterialToDB:", error);
      setError(error);
      throw error;
    });

    try {
      const [addRecipeMaterialLogResponse, editStockResponse] =
        await Promise.all([addRecipeMaterialLogPromise, editStockPromise]);

      if (addRecipeMaterialLogResponse?.error) {
        return setError(addRecipeMaterialLogResponse?.error);
      }
      if (editStockResponse?.error) {
        return setError(editStockResponse?.error);
      }

      addRecipeMaterialLog(addRecipeMaterialLogResponse);
      editRecipeMaterial(editStockResponse);
      setSubmitting(false);
      closeModal();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const onEdit = async (values, { setSubmitting }) => {
    try {
      setError("");
      setSubmitting(true);
      values.last_edited_by = user.userid;

      const response = await editRecipeMaterialLogToDB(
        user.tokens.access_token,
        values,
        selected.id
      );
      if (response?.error) return setError(response.error);
      editRecipeMaterialLog(response);
      setSubmitting(false);
      closeModal();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validate={validate}
      onSubmit={editing ? onEdit : onSubmit}
      error={error}
      title={t(editing ? "editMaterialStock" : "addMaterialStock")}
    />
  );
};

export default CreateMaterialStock;
