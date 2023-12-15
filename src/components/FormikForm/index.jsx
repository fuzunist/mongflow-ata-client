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
          <FormError
            error={message?.message ?? message}
            variant={message?.variant ?? "danger"}
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {Object.entries(initialValues).map(([key, value], index) => {
              const Element = FormElements[value?.tag];
              const elementValue = values[key] ?? value.value;

              return (
                <Element
                  key={key}
                  type={value?.type}
                  placeholder={value?.placeholder}
                  name={key}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  value={elementValue}
                  _label={value?.name}
                  options={value?.options}
                  readOnly={value?.readOnly ?? false}
                  disabled={disabled}
                  min={value?.min}
                  max={value?.max}
                  product_id={values?.product_id ?? -1}
                  products={value?.products ?? []}
                />
              );
            })}

            {children}

            <button
              type="submit"
              disabled={disabled || isSubmitting}
              className={classNames(
                "mt-6 flex justify-center items-center rounded p-2 text-white transition-colors text-base font-semibold disabled:bg-disabled-light disabled:dark:bg-disabled-dark",
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
