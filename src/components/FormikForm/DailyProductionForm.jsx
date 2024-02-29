import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import FormError from "./FormError";
import { useMemo } from "react";
import FormElements from "./FormElements";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import { FieldArray } from "formik";
import { values } from "lodash";

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
  numberOfProductions,
  setNumberOfProductions,
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
  }, [initialValues, numberOfProductions]);

  console.log("initial values in form", initialValues);
  return (
    <Formik
      initialValues={_initialValues}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize={true}
      shouldValidate
    >
      {({
        values,
        errors,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        setValues,
      }) => {
        if (
          initialValues?.productions?.length !== values?.productions?.length
        ) {
    
          // prods.push(initialValues.productions[numberOfProductions-1])
          // Assuming values and initialValues are available
          if (initialValues.productions.length > 0 && values.productions) {
            if (numberOfProductions > values.productions.length) {
              const latestProduction =
                initialValues.productions[numberOfProductions - 1];
              const updatedProductions = [
                ...values.productions,
                latestProduction,
              ];
              setValues({
                ...values,
                productions: updatedProductions,
              });
            } else if (numberOfProductions < values.productions.length) {
              const updatedProductions = values.productions.slice(
                0,
                numberOfProductions
              );
              setValues({
                ...values,
                productions: updatedProductions,
              });
            }
          }
        }
        return (
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              className="flex flex-col items-center justify-center"
            >
              <div className={"flex flex-col gap-2 "}>
                {console.log("valuessssssss,", values)}

                {Object.entries(initialValues).map(([key, value], index) => {
                  const Element = FormElements[value?.tag];
                  const elementValue = values[key] ?? value.value;

                  return (
                    <div
                      key={index}
                      className={"flex flex-col gap-4 justify-center w-full"}
                    >
                      {key === "productions" ? (
                        <div>
                          <FieldArray
                            name="productions"
                            render={(arrayHelpers) => (
                              <div>
                                {initialValues?.productions?.map(
                                  (production, productionIndex) => {
                                    console.log(
                                      "initialValues.productions",
                                      initialValues.productions
                                    );
                                    return (
                                      <div key={productionIndex}>
                                        {Object.keys(production)?.map(
                                          (name, fieldIndex) => {
                                            const valueg = production[name];
                                            const Element =
                                              FormElements[valueg?.tag];

                                            return (
                                              <div
                                                key={fieldIndex}
                                                className="flex flex-col my-3"
                                              >
                                                {valueg?.groupStart &&
                                                  numberOfProductions > 1 && (
                                                    <>
                                                      <div className="flex items-center justify-center  font-semibold text-green-700 text-md my-1 mt-3 ">
                                                        {valueg.group + 1}.{" "}
                                                        Sipariş{" "}
                                                        {productionIndex + 1 ===
                                                          numberOfProductions && (
                                                          <span
                                                            onClick={() =>
                                                              setNumberOfProductions(
                                                                (prev) =>
                                                                  prev - 1
                                                              )
                                                            }
                                                            className="flex cursor-pointer justify-center ml-auto items-center text-red-700"
                                                          >
                                                            <Trash2 />
                                                          </span>
                                                        )}
                                                      </div>
                                                      <hr className="w-full bg-green-700 h-0.5 my-1 text-center" />
                                                    </>
                                                  )}

                                                <Element
                                                  className={"my-2"}
                                                  name={`productions[${productionIndex}].${name}.value`}
                                                  key={`productions[${productionIndex}].${name}.value_${productionIndex}`}
                                                  type={valueg?.type}
                                                  placeholder={
                                                    valueg?.placeholder
                                                  }
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  errors={errors}
                                                  touched={touched}
                                                  value={
                                                    values?.productions
                                                      ? values?.productions[
                                                          productionIndex
                                                        ][name]?.value
                                                      : initialValues
                                                          ?.productions[
                                                          productionIndex
                                                        ][name]?.value ??
                                                        valueg.value ??
                                                        values[key].value
                                                  }
                                                  _label={valueg?.label}
                                                  options={valueg?.options}
                                                  readOnly={
                                                    valueg?.readOnly ?? false
                                                  }
                                                  disabled={disabled}
                                                  min={valueg?.min}
                                                  product_id={
                                                    values?.productions &&
                                                    values?.productions[
                                                      productionIndex
                                                    ] &&
                                                    values?.productions[
                                                      productionIndex
                                                    ]["product_id"]
                                                      ? values?.productions[
                                                          productionIndex
                                                        ]["product_id"]?.value
                                                      : -1
                                                  }
                                               
                                                  products={
                                                    valueg?.products ?? []
                                                  }
                                                  attributes={
                                                    values?.productions &&
                                                    values?.productions[
                                                      productionIndex
                                                    ] && // Check if productions[productionIndex] exists
                                                    values?.productions[
                                                      productionIndex
                                                    ]["attributes"]?.value
                                                      ? values?.productions[
                                                          productionIndex
                                                        ]["attributes"]?.value
                                                      : []
                                                  }
                                                  orders={valueg?.orders}
                                                />
                                                {valueg?.groupEnd &&
                                                  valueg?.groupEndIndex + 1 ===
                                                    numberOfProductions && (
                                                    <div
                                                      onClick={() =>
                                                        setNumberOfProductions(
                                                          (prev) => prev + 1
                                                        )
                                                      }
                                                      className="flex justify-center items-center font-bold cursor-pointer text-green-700 hover:text-green-800 my-2 mt-3 gap-x-2"
                                                    >
                                                      <div>
                                                        <PlusCircleIcon />
                                                      </div>
                                                      <div>Sipariş Ekle</div>
                                                    </div>
                                                  )}
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            )}
                          />
                        </div>
                      ) : key === "secondQualityStocks" ? (
                        <>
                          <FieldArray
                            name="secondQualityStocks"
                            render={(arrayHelpers) =>
                              initialValues?.secondQualityStocks?.map(
                                (secondQualityStock, secondQualityIndex) => {
                                  return (
                                    <div key={secondQualityIndex}>
                                      {Object.values(secondQualityStock)?.map(
                                        (valueg, fieldIndex) => {
                                          const Element =
                                            FormElements[valueg?.tag];
                                          console.log(
                                            "value of second quality ",
                                             initialValues
                                            ?.secondQualityStocks[
                                            secondQualityIndex
                                          ][valueg.id].value
                                          );
                                           console.log("values in common ", values)

                                          return (
                                            <div
                                              key={valueg.id}
                                              className="flex flex-col my-3"
                                            >
                                              <Element
                                                className={"my-2"}
                                                name={valueg.name}
                                                key={valueg.id}
                                                type={valueg?.type}
                                                placeholder={
                                                  valueg?.placeholder
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                errors={errors}
                                                touched={touched}
                                                value={
                                                  values?.secondQualityStocks
                                                    ? values
                                                        ?.secondQualityStocks[
                                                        secondQualityIndex
                                                      ][valueg.id]?.value
                                                    : initialValues
                                                    ?.secondQualityStocks[
                                                    secondQualityIndex
                                                  ][valueg.id].value ??
                                                      valueg.value ??
                                                      values[key].value
                                                }
                                                _label={valueg?.label}
                                                min={valueg?.min}
                                              />
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  );
                                }
                              )
                            }
                          />
                        </>
                      ) : (
                        <>
                          <Element
                            className={recipe || material ? "w-3/5 " : ""}
                            key={key + 1}
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
                            // productions={value?.productions}
                          />
                        </>
                      )}
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
        );
      }}
    </Formik>
  );
};

export default FormikForm;
