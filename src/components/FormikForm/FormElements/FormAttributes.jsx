import { useTranslation } from "react-i18next";
import LabelError from "../LabelError";
import { useEffect } from "react";
import { useState } from "react";

const FormAttributes = ({
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
}) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  console.log("products", products);
  
  console.log("value", value);
  const attrValueChange = (attrValue, attr) => {
     console.log( "attr", attr)
     console.log( "attrVal", attrValue)

    const newValue = [...value].map((val) => {
      if (val.id === attr.id) {
        val.value = parseInt(attrValue);
        val.attr = attr.name;
        val.attrValue = attr.values.find(
          (value) => value.id === parseInt(attrValue)
        ).name;
      }
      return val;
    });
    onChange({ target: { name, value: newValue } });
    onBlur({ target: { name, value: newValue } });
  };

   console.log("product_id", product_id)

  useEffect(() => {
    setLoading(true);
    if (parseInt(product_id) === -1) {
      console.log("product_id in formatrr useEffect", product_id)

      onChange({ target: { name, value: [] } });
      onBlur({ target: { name, value: [] } });
      setProduct(null);
    } else {
      const _product = products.find(
        (prod) => prod.id === parseInt(product_id)
      );
       console.log("_product in formattr useEffect",_product)
      if (!readOnly) {
        if (_product) {
          onChange({
            target: {
              name,
              value: _product?.attributes.map((attr) => ({
                id: attr.id,
                value: 0,
              })),
            },
          });
          onBlur({
            target: {
              name,
              value: _product?.attributes.map((attr) => ({
                id: attr.id,
                value: 0,
              })),
            },
          });
        } else {
          onChange({ target: { name, value: [] } });
          onBlur({ target: { name, value: [] } });
        }
      }
      setProduct(_product);
    }
  }, [product_id]);

   console.log("product",product)
  useEffect(() => {
    product && value && value.length > 0 && setLoading(false);
  }, [value, product]);

   console.log("product.attributes",product?.attributes)
  return (
    <div className="flex flex-col gap-2">
      <span className="text-base font-semibold">{_label}</span>
      <div className="flex-1 max-h-[300px] overflow-y-auto flex flex-col gap-2 p-2 border border-input-focusborder-light dark:border-input-focusborder-dark rounded">
        {!loading && product ? (
          product?.attributes.map((attr, attrIndex) => (
            <label
              key={attrIndex}
              className="flex justify-between items-center gap-2"
            >
              <span className="font-medium mb-2 w-1/2 overflow-hidden text-ellipsis whitespace-nowrap">
                {attr?.name}
              </span>
              <select
                value={value.find((val) => val.id === attr.id).value}
                onChange={(e) => attrValueChange(e.target.value, attr)}
                className="py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border border-input-border-light dark:border-input-border-dark rounded flex-1"
                disabled={disabled || readOnly}
              >
                <option value={0}>{t("choose")}</option>
                {attr.values.map((value, index) => (
                  <option key={index} value={value.id}>
                    {value.name}
                  </option>
                ))}
              </select>
            </label>
          ))
        ) : (
          <span className="w-full text-center text-text-dark-light dark:text-text-dark-dark font-semibold">
            Ürün seçiniz
          </span>
        )}
      </div>
      <LabelError errors={errors} value={name} touched={touched} />
    </div>
  );
};

export default FormAttributes;
