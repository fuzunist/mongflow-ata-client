import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import FormError from "./FormError";
import { useMemo } from "react";
import FormElements from "./FormElements";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

const FormikForm = ({
  title,
  initialValues,
  validate,
  onSubmit,
  error,
  children,
  disabled = false,
  text = "submit",
  variant = "normal",
  recipe,
  material,
  product,
}) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  useEffect(() => {
    setMessage(error);
    console.log("error", error);
    error?.variant === "success" && setTimeout(() => setMessage(""), 5e3);
  }, [error]);

  const _initialValues = useMemo(() => {
    const newValues = {};
    Object.entries(initialValues).forEach(([key, value]) => {
      newValues[key] = value.value;
    });
    return newValues;
  }, [initialValues]);

  return (
    <Formik
      initialValues={_initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
      }) => (
        <div className="flex flex-col gap-4">
          {title && (
            <h2 className="text-center w-full text-2xl font-semibold uppercase">
              {title}
            </h2>
          )}

          {recipe && (
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center mx-1 gap-1">
                <span className="font-semibold">{product.product_name}</span>
                <span className="text-sm font-light">
                  {Object.entries(product.attributes)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ")}
                </span>
                <span className="font-bold">{product.quantity} ton</span>
              </div>
              <span className="w-full p-[0.2px] bg-black lg:w-full mt-1"></span>
              <div className="mt-5 text-lg font-light">
                1 ton için gerekli miktar:
              </div>
            </div>
          )}
          <FormError
            error={message?.message ?? message}
            variant={message?.variant ?? "danger"}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="flex flex-col items-center justify-center"
          >
            <div
              className={
                !material
                  ? "flex flex-col gap-2 "
                  : "grid gap-4 gap-x-12 xs:grid-cols-1 sm: grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              }
            >
              {Object.entries(initialValues).map(([key, value], index) => {
                const Element = FormElements[value?.tag];
                const elementValue = values[key] ?? value.value;

                return (
                  <div
                    key={index}
                    className={
                      recipe || material
                        ? " flex flex-row gap-x-3 items-center justify-between "
                        : "flex flex-col gap-2"
                    }
                  >
                    {(recipe || material) && (
                      <label className="w-2/5 mt-1">
                        {value?.label}{" "}
                        {recipe ? " (kg)" : material ? " (USD/kg)" : ""}
                      </label>
                    )}

                    <Element
                      className={recipe || material ? "w-3/5 " : ""}
                      key={key}
                      type={value?.type}
                      placeholder={value?.placeholder}
                      name={key}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      value={elementValue}
                      _label={recipe || material ? "" : value?.label}
                      options={value?.options}
                      readOnly={value?.readOnly ?? false}
                      disabled={disabled}
                      min={value?.min}
                      max={value?.max}
                      product_id={values?.product_id ?? -1}
                      products={value?.products ?? []}
                      attributes={values?.attributes ?? []}
                      orders={value?.orders}
                    />
                  </div>
                );
              })}

              {children}
            </div>
            <button
              type="submit"
              disabled={disabled || isSubmitting}
              className={classNames(
                "mt-4 flex justify-center items-center rounded p-2 px-4 text-white transition-colors text-base font-semibold disabled:bg-disabled-light disabled:dark:bg-disabled-dark",
                {
                  "bg-link-fg-light hover:bg-link-hover-light":
                    variant === "normal",
                  "bg-alert-danger-fg-dark hover:bg-alert-danger-fg-light":
                    variant === "danger",
                }
              )}
            >
              {t(text)}
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default FormikForm;
