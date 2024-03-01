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
      return groupAttributesByName(selectedProduct?.attributes);
    return {};
  }, [selectedProduct]);

  const initialValues = useMemo(() => {
    if (!selectedProduct) return {};

    return Object.entries(groupedAttributes).reduce(
      (acc, [attrName, attrValues]) => {
        if (attrValues.length > 1) {
          // Multiple values, create a dropdown
          acc[attrName] = {
            tag: "select",
            label: attrName,
            value: attrValues[0].value, // default to the first value
            options: attrValues.map((val) => ({
              key: val.value,
              // value: `${val.value} (${val.extra_price} ${selectedProduct.currency_code})`
              value: val.value,
            })),
          };
        } else {
          // Single value, display as plain text
          const singleAttr = attrValues[0];
          acc[attrName] = {
            tag: "input",
            readOnly: true,
            label: attrName,
            // value: `${singleAttr.value} (${singleAttr.extra_price} ${selectedProduct.currency_code})`
            value: singleAttr.value,
          };
        }
        return acc;
      },
      {}
    );
  }, [selectedProduct, groupedAttributes]);

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
            onContinueOrder(
              values,
              quantity,
              productType,
              close,
              setQuantity,
              setProductType
            )
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
