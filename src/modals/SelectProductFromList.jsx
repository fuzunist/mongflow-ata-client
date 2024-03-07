import { useState, useEffect, useMemo } from "react";
import { PlusIcon } from "lucide-react";
import { MinusIcon } from "lucide-react";

import { groupAttributesByName } from "@/utils/helpers";

import FormikForm from "@/components/FormikForm";
import Modal from "@/components/Modal";
import { useTranslation } from "react-i18next";
import { setProduct } from "@/store/actions/apps";

const SelectProductFromList = ({
  selectedProduct,
  selectedCustomer,
  onContinueOrder,
}) => {
  const productId = selectedProduct?.product_id;
  const customerId = selectedCustomer?.customerid;
  const [quantity, setQuantity] = useState(1);
  const [productType, setProductType] = useState("kg");
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (productId && customerId) {
      setIsOpen(false);
      setTimeout(() => setIsOpen(true), 100);
    } else setIsOpen(false);
  }, [productId, customerId]);

  const groupedAttributes = useMemo(() => {
    if (selectedProduct)
      return groupAttributesByName(selectedProduct.attributes);
    return {};
  }, [selectedProduct]);

  const initialValues = useMemo(() => {
    if (!selectedProduct || !selectedProduct.attributes) return {};

    return Object.values(selectedProduct.attributes).reduce((acc, item) => {
        console.log("attr name and vals item", item);
        const attributeName = item.attribute_name;
        const attributeId = item.attribute_id;

        if (item.values.length > 1) {
            // Multiple values, create a dropdown
            acc[attributeId] = {
                tag: "select",
                label: attributeName,
                value:  `${item.attribute_id}:${item.values[0].value_id},${attributeName}:${item.values[0].value}`, // default to the first value
                options: item.values.map((val) => ({
                    key: `${item.attribute_id}:${val.value_id},${attributeName}:${val.value}`,
                    value: val.value,
                })),
            };
        } else {
            // Single value, display as plain text
            const singleAttr = item.values[0];
            acc[attributeName] = {
                tag: "input",
                readOnly: true,
                label: attributeName,
                value: singleAttr.value,
            };
        }

        return acc;
    }, {});
}, [selectedProduct]);


  console.log("selectedProduct?.attributes:: xs12 ", selectedProduct?.attributes)
   console.log("groupped attr:: xs12", groupedAttributes)
   console.log("initialValues:: xs12", initialValues)

  useEffect(() => {
    setQuantity(1);
    setIsOpen(false);
    setProductType("kg");
    return () => {
      setQuantity(1);
      setIsOpen(false);
      setProductType("kg");
    };
  }, []);


  if (!productId || !customerId || !isOpen) return null;

  return (
    <Modal directRender={true} closeModal={() => setProduct(null)}>
      {({ close }) => (
        <FormikForm
          title={t("product_detail_selection")}
          initialValues={initialValues}
          onSubmit={(values) =>
            
         { 
          console.log("vals of select prod", values)

          const attributesIds={}
          const attributes={}
           Object.values(values).forEach((item)=> {
            const attr_id= item.split(',')[0].split(':')[0]
            const val_id=item.split(',')[0].split(':')[1]
            attributesIds[attr_id]= parseInt(val_id)

            const attr_name= item.split(',')[1].split(':')[0]
            const val_name=item.split(',')[1].split(':')[1]
            attributes[attr_name]= val_name
            
           }
          )

           console.log("attribute detss ",attributes)
            console.log("attribute detss ids",attributesIds)
          return onContinueOrder(
              attributes,
              attributesIds,
              quantity,
              productType,
              close,
              setQuantity,
              setProductType
            )}
          }
        >
          {/* Quantity ("Adet") section */}
          <div
            className="quantity-section"
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() =>
                setQuantity((quantity) => Math.max(1, quantity - 1))
              }
              style={{ marginRight: "10px" }}
              className="flex justify-center items-center"
            >
              <MinusIcon size={18} strokeWidth={2.5} />
            </button>
            <input
              type="number"
              id="quantity_input"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              className="mx-2 text-center w-16 py-1.5 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded border-input-border-light dark:border-input-border-dark"
              style={{
                MozAppearance: "textfield",
              }}
            />

            <button
              type="button"
              onClick={() => setQuantity((quantity) => quantity + 1)}
              style={{ marginLeft: "10px" }}
              className="flex justify-center items-center"
            >
              <PlusIcon size={18} strokeWidth={2.5} />
            </button>
          </div>
        </FormikForm>
      )}
    </Modal>
  );
};

export default SelectProductFromList;
