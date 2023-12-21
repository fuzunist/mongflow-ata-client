import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import FormError from "./FormError";
import { useMemo } from "react";
import FormElements from "./FormElements";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { Collapse } from "antd";

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
  classes,
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
            <h2 className="text-center w-full text-2xl font-semibold uppercase mb-3">
              {title}
            </h2>
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
            <div className={"flex flex-col gap-y-4 w-[60%]"}>
              {Object.entries(classes).map(([classkey, classvalue], index) => {
                return (
                  <Collapse
                    key={index + 200}
                    items={[
                      {
                        key: index,
                        label: classvalue.name,
                        children: Object.entries(initialValues).map(
                          ([key, value], index) => {
                            if (value.class === classvalue.id) {
                              const Element = FormElements[value?.tag];
                              const elementValue = values[key] ?? value.value;

                              return (
                                <div
                                  key={index}
                                  className={
                                    "flex gap-2 mb-2 justify-center items-center"
                                  }
                                >
                                  <label className="w-2/6 mt-1">
                                    {value?.label} (₺){" "}
                                  </label>

                                  <Element
                                    className={"w-3/6 "}
                                    key={key}
                                    type={value?.type}
                                    placeholder={value?.placeholder}
                                    name={key}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                    value={elementValue}
                                    //   _label={value?.label}
                                    options={value?.options}
                                    readOnly={value?.readOnly ?? false}
                                    disabled={disabled}
                                    min={value?.min}
                                    max={value?.max}
                                    step="any"
                                  />
                                  <div className="w-1/6 mt-1 ml-2 text-xs font-light">
                                    {value.frequency === 1
                                      ? "(monthly)"
                                      : value.frequency === 12 ? "(yearly)" : `1/${value.frequency}`}
                                  </div>
                                </div>
                              );
                            }
                          }
                        ),
                      },
                    ]}
                  />
                );
              })}

              {children}
            </div>
            <button
              type="submit"
              disabled={disabled || isSubmitting}
              className={classNames(
                "mt-6 flex justify-center items-center rounded p-2 px-4 text-white transition-colors text-base font-semibold disabled:bg-disabled-light disabled:dark:bg-disabled-dark",
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
