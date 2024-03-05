import FormikForm from "@/components/FormikForm/DailyProductionForm";
import { addProductionToDB, updateProductionToDB } from "@/services/production";
import {
  editProduction,
  editStock,
} from "@/store/actions/apps";
import { useProducts, useOrders } from "@/store/hooks/apps";
import { useUser } from "@/store/hooks/user";
import { dateToIsoFormatWithTimezoneOffset } from "@/utils/helpers";
import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";

const CreateProduction = ({ closeModal, editing = false, selected }) => {
  const user = useUser();
  const products = useProducts();
  const orders = useOrders();
  const [numberOfProductions, setNumberOfProductions] = useState(1);
  const [error, setError] = useState("");
  const { t } = useTranslation();
 console.log( "products:", products)
  let productions;

  let secondQualityStocks= products.filter((product)=> product.product_type===1).map((item)=> ({
    [`${item.product_id}`]: {
      id: item.product_id,
      name: item.product_id,
      tag: "input",
      type: "number",
      placeholder:"Elde Edilen "+ item.product_name,
      label: "Elde Edilen "+ item.product_name,
      value: 0,
      min: 0,
    }
  }))

  

  
   console.log(secondQualityStocks," secondQualityStocksA")
  let initialValues = useMemo(() => {
    productions = Array.from({ length: numberOfProductions }).map(
      (_, index) => ({
        [`product_id`]: {
          tag: "select",
          label: t("productname"),
          value: editing ? selected.product_id : 0,
          readOnly: editing,
          groupStart: true,
          group: index,
          options: (() => {
            const initialOptions = [
              {
                key: 0,
                value: t("choose"),
              },
            ];

            const changedProducts = products.map((product) => ({
              key: product.product_id,
              value: product.product_name,
            }));

            return initialOptions.concat(changedProducts);
          })(),
        },
        [`attributes`]: {
          tag: "stock",
          label: t("attributes"),
          value: [],
          readOnly: editing,
          products: products.map((product) => ({
            id: product.product_id,
            attributes: product?.attributes ? product?.attributes?.map((attr) => ({
              id: attr.attribute_id,
              name: attr.attribute_name,
              values: attr.values.map((val) => ({
                id: val.value_id,
                name: val.value,
              })),
            })) : [],
          })),
        },
        [`orders`]: {
          tag: "orders",
          label: t("selectOrder"),
          value: [],
          orders: orders?.map((order) => ({
            order_id: order.order_id,
            order_number: order.order_number,
            products: order?.products?.map((product) => ({
              product_id: product?.product_id,
              product_attributes: product?.attributes,
            })),
          })),
        },
        [`production`]: {
          tag: "input",
          type: "number",
          placeholder: t("production"),
          label: t("production"),
          value: editing ? selected.production : 0,
          min: 0,
          groupEnd: true,
          groupEndIndex: index,
        },
      })
    );

    const initialValues2 = {
      shift: {
        tag: "select",
        label: t("shiftname"),
        value: editing ? selected.shift : 1,
        readOnly: editing,
        options: [
          {
            key: 1,
            value: 1,
          },
          {
            key: 2,
            value: 2,
          },
          {
            key: 3,
            value: 3,
          },
        ],
      },
      productions: productions,
      wastage: {
        tag: "input",
        type: "number",
        placeholder: t("wastage_kg"),
        label: t("wastage_kg"),
        value: editing ? selected.production : 0,
        min: 0,
      },
      secondQualityStocks:secondQualityStocks,
      
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

    return initialValues2;
  }, [numberOfProductions]);

  useEffect(() => {
    productions = Array.from({ length: numberOfProductions }).map(
      (_, index) => ({
        [`product_id`]: {
          tag: "select",
          label: t("productname"),
          value: editing ? selected.product_id : 0,
          readOnly: editing,
          groupStart: true,
          group: index,
          options: (() => {
            const initialOptions = [
              {
                key: 0,
                value: t("choose"),
              },
            ];

            const changedProducts = products.map((product) => ({
              key: product.product_id,
              value: product.product_name,
            }));

            return initialOptions.concat(changedProducts);
          })(),
        },
        [`attributes`]: {
          tag: "stock",
          label: t("attributes"),
          value: [],
          readOnly: editing,
          products: products.map((product) => ({
            id: product.product_id,
            attributes: product?.attributes ? product?.attributes?.map((attr) => ({
              id: attr.attribute_id,
              name: attr.attribute_name,
              values: attr.values.map((val) => ({
                id: val.value_id,
                name: val.value,
              })),
            })) : [],
          })),
        },
        [`orders`]: {
          tag: "orders",
          label: t("selectOrder"),
          value: [],
          orders: orders?.map((order) => ({
            order_id: order.order_id,
            order_number: order.order_number,
            products: order?.products?.map((product) => ({
              product_id: product?.product_id,
              product_attributes: product?.attributes,
            })),
          })),
        },
        [`production`]: {
          tag: "input",
          type: "number",
          placeholder: t("production"),
          label: t("production"),
          value: editing ? selected.production : 0,
          min: 0,
          groupEnd: true,
          groupEndIndex: index,
        },
      })
    );

    initialValues = {
      shift: {
        tag: "select",
        label: t("shiftname"),
        value: editing ? selected.shift : 1,
        readOnly: editing,
        options: [
          {
            key: 1,
            value: 1,
          },
          {
            key: 2,
            value: 2,
          },
          {
            key: 3,
            value: 3,
          },
        ],
      },
      productions: productions,
      wastage: {
        tag: "input",
        type: "number",
        placeholder: t("wastage_kg"),
        label: t("wastage_kg"),
        value: editing ? selected.production : 0,
        min: 0,
      },
      secondQualityStocks: secondQualityStocks,
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
  }, [numberOfProductions]);

  console.log("initialValuessssss", initialValues);

  const validate = (values) => {
    const errors = {};
    if (!values?.product_id) errors.product_id = "Required";
    if (!values?.production) errors.production = "Required";
    if (!values?.attributes) errors.attributes = "Required";
    if (values?.attributes?.some((attr) => attr.value === 0))
      errors.attributes = "Required";
    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    console.log("values of prods::", values);
    // setError("");
    // const attributes = values.attributes
    //   .map((attr) => `${attr.id}-${attr.value}`)
    //   .join(",");
    // const response = await addProductionToDB(
    //   user.tokens.access_token,
    //   values.product_id,
    //   attributes,
    //   values.date,
    //   values.production
    // );
    // if (response?.error) return setError(response.error);
    // addProduction(response.production);
    // if (response.stock.new) addStock(response.stock);
    // else editStock(response.stock);
    // setSubmitting(false);
    closeModal();
  };

  const onEdit = async (values, { setSubmitting }) => {
    setError("");
    const response = await updateProductionToDB(
      user.tokens.access_token,
      selected.production_id,
      values.production
    );
    if (response?.error) return setError(response.error);
    editProduction(response.production);
    editStock(response.stock);
    setSubmitting(false);
    closeModal();
  };

  return (
    <FormikForm
      initialValues={initialValues}
      // validate={validate}
      onSubmit={editing ? onEdit : onSubmit}
      error={error}
      title={t(editing ? "editProduction" : "addShift")}
      numberOfProductions={numberOfProductions}
      setNumberOfProductions={setNumberOfProductions}
      enableReinitialize={true}
    />
  );
};

export default CreateProduction;