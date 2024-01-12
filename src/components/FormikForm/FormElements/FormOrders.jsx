import { useTranslation } from "react-i18next";
import LabelError from "../LabelError";
import { useEffect } from "react";
import { useState } from "react";

const FormOrders = ({
  value,
  onChange,
  onBlur,
  name,
  errors,
  _label = "",
  touched,
  disabled,
  readOnly,
  product_id,
  products,
  attributes,
  orders,
}) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const attrValueChange = (order_id) => {
    onChange({ target: { name, value: order_id } });
    onBlur({ target: { name, value: order_id } });
  };

  useEffect(() => {
    console.log("orders:", orders);
    console.log("attributes:", attributes);
   if(attributes.length && orders.length){
    const test = orders?.products?.map(
        (product) =>
          product?.product_attributes?.map(([key, value]) => ({
            name: key,
            nameValue: value,
          })) || []
      );
  
       console.log("testt::", test)

//        const filtered = orders?.filter((order) => {
//         return order?.products?.some((product) =>
//             product?.product_attributes?.some((attr) =>
//                 attributes.some(
//                     (attrb) =>
//                         attrb.attr === attr.name && attrb.attrValue === attr.nameValue
//                 )
//             )
//         );
//     });
    
//  console.log("filtered::", filtered)
   }

    // setOrder(filtered);
    setOrder(orders);
  }, [orders, attributes]);

  useEffect(() => {
    order && value && value.length > 0 && setLoading(false);
  }, [value, order]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-base font-semibold">{_label}</span>
      <div className="flex-1 max-h-[300px] overflow-y-auto flex flex-col gap-2 p-2 border border-input-focusborder-light dark:border-input-focusborder-dark rounded">
        {!loading && attributes?.length && order?.length ? (
          <>
            {/* <span className="font-medium mb-2 w-1/2 overflow-hidden text-ellipsis whitespace-nowrap">
              {"hheu"}
            </span> */}
            <select
              //   value={order.order_id}
              onChange={(e) => attrValueChange(e.target.value)}
              className="py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border border-input-border-light dark:border-input-border-dark rounded flex-1"
              disabled={disabled || readOnly}
            >
              <option value={0}>{t("choose")}</option>
              {order?.map((order, orderIndex) => (
                <option key={orderIndex} value={order.order_id}>
                  {order.order_number}
                </option>
              ))}
            </select>
          </>
        ) : (
          <span className="w-full text-center text-text-dark-light dark:text-text-dark-dark font-semibold">
            {t("selectOrder")}
          </span>
        )}
      </div>
      <LabelError errors={errors} value={name} touched={touched} />
    </div>
  );
};

export default FormOrders;
