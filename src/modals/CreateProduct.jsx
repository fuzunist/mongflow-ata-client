import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useUser } from "@/store/hooks/user";
import {
  addProductToDB,
  delProductFromDB,
  editProductToDB,
} from "@/services/product";
import { addProduct, delProduct, editProduct } from "@/store/actions/apps";

import { mergeDeep } from "@/utils/helpers";

import FormikForm from "@/components/FormikForm";

const CreateProduct = ({ closeModal, selectedProduct, type }) => {
  const user = useUser();
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const initialValues = {
    productName: {
      tag: "input",
      type: "text",
      placeholder: "Ürün İsmi Girin",
      value: selectedProduct?.product_name ?? "",
    },
    // defaultPrice: {
    //     tag: 'input',
    //     type: 'number',
    //     value: selectedProduct?.default_price ?? ''
    // },
    // defaultCurrency: {
    //     tag: 'select',
    //     value: selectedProduct?.currency_code ?? '', // Default value, if any.
    //     options: [
    //         { key: '', value: 'Seçiniz' }, // Default value, if any.
    //         { key: 'TL', value: 'TL' },
    //         { key: 'USD', value: 'USD' },
    //         { key: 'EUR', value: 'EUR' }
    //     ]
    // },
    attributes: {
      tag: "attributes",
      type: "text",
      placeholder: "Ürün Özelliği Girin",
      value: selectedProduct?.attributes
        ? mergeDeep([], [...selectedProduct?.attributes])
        : [],
    },
  };

  const validate = (values) => {
    const errors = {};
    if (!values.productName) errors.productName = "Required";
    // if (!values.defaultPrice) errors.defaultPrice = 'Required'
    // if (!values.defaultCurrency) errors.defaultCurrency = 'Required'
    // if (values.attributes.length === 0)
    //   errors.attributes = "Add at least one feature. 1";
    // if (values.attributes.some((attr) => !attr.attribute_name))
    //   errors.attributes = "Add at least one feature. 2";
    // if (values.attributes.some((attr) => attr.values.length === 0))
    //   errors.attributes = "Add at least one feature. 3";
    // if (values.attributes.some((attr) => attr.values.some((val) => !val)))
    //   errors.attributes = "Add at least one feature. 4";
    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setError("");
    const response = await addProductToDB(
      user.tokens.access_token,
      values.productName,
      0, // values.defaultPrice,
      "USD", // values.defaultCurrency,
      values.attributes,
      type
    );
    if (response?.error) return setError(response.error);
    setSubmitting(false);
    addProduct(response);
    closeModal();
  };

  const onEdit = async (values, { setSubmitting }) => {
    setError("");
    const response = await editProductToDB(
      user.tokens.access_token,
      selectedProduct.product_id,
      values.productName,
      0, // values.defaultPrice,
      "USD", // values.defaultCurrency,
      values.attributes
    );
    if (response?.error) return setError(response.error);
    editProduct(response);
    setSubmitting(false);
    closeModal();
  };

  const onDelete = async () => {
    setError("");
    const response = await delProductFromDB(
      user.tokens.access_token,
      selectedProduct.product_id
    );
    if (response?.error) return setError(response.error);
    delProduct(selectedProduct.product_id);
    closeModal();
  };

  return (
    <>
      <FormikForm
        onSubmit={selectedProduct ? onEdit : onSubmit}
        validate={validate}
        initialValues={initialValues}
        error={error}
        title={t(
          selectedProduct
            ? !!type
              ? "editOtherProduct"
              : "editProduct"
            : !!type
            ? "addOtherProduct"
            : "addProduct"
        )}
      />
      {selectedProduct && (
        <button
          className="py-2 px-3 bg-danger hover:bg-alert-danger-fg-light transition-colors text-white w-full mt-4 rounded"
          onClick={onDelete}
        >
          {t("delete")}
        </button>
      )}
    </>
  );
};

export default CreateProduct;
