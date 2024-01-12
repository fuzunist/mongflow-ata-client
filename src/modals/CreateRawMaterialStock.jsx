import FormikForm from "@/components/FormikForm";
import {
  addRawMaterialLogToDB,
  editRawMaterialLogToDB,
  editRawMaterialToDB,
} from "@/services/rawmaterial";
import { useUser } from "@/store/hooks/user";
import { dateToIsoFormatWithTimezoneOffset } from "@/utils/helpers";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRawMaterials } from "@/store/hooks/apps";
import {
  addRawMaterialLog,
  editRawMaterialLog,
  editRawMaterial,
} from "@/store/actions/apps";

const CreateRawMaterialStock = ({ closeModal, editing = false, selected }) => {
  const user = useUser();
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const rawMaterialStocks = useRawMaterials();
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

        const changedProducts = rawMaterialStocks.map((item) => ({
          key: item.id,
          value: item.material,
        }));

        return initialOptions.concat(changedProducts);
      })(),
    },
    // id:{
    //     value: selected.id
    // },

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
    supplier: {
      tag: "input",
      type: "text",
      placeholder: t("supplier"),
      label: t("supplier"),
      value: "",
    },
    waybill: {
      tag: "input",
      type: "text",
      placeholder: t("waybill"),
      label: t("waybill"),
      value: "",
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
    if (!values.supplier) errors.supplier = "Required";
    if (!values.waybill) errors.waybill = "Required";

    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setError("");
    setSubmitting(true);
    values.last_edited_by = user.userid;

    const addRawMaterialLogPromise = addRawMaterialLogToDB(
      user.tokens.access_token,
      values
    ).catch((error) => {
      console.error("Error in addRecipeMaterialLogToDB:", error);
      setError(error);
      throw error;
    });

    const currentStock = rawMaterialStocks.find((stock) => {
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

    const editRawStockPromise = editRawMaterialToDB(
      user.tokens.access_token,
      stockdata,
      values.item_id
    ).catch((error) => {
      console.error("Error in editRawMaterialToDB:", error);
      setError(error);
      throw error;
    });

    try {
      const [addRawMaterialLogResponse, editRawStockResponse] =
        await Promise.all([addRawMaterialLogPromise, editRawStockPromise]);

      addRawMaterialLog(addRawMaterialLogResponse);
      editRawMaterial(editRawStockResponse);
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

      const response = await editRawMaterialLogToDB(
        user.tokens.access_token,
        values,
        selected.id
      );
      if (response?.error) return setError(response.error);
      editRawMaterialLog(response);
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

export default CreateRawMaterialStock;
