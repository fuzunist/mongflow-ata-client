import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import FormError from "./FormError";
import { useMemo } from "react";
import FormElements from "./FormElements";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { Select, InputNumber, Switch, Input } from "antd";

const SendToProductionForm = ({
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
  recipe_id,
  material,
  product,
  setOtherInputs,
  otherInputs,
  saveRecipe,
  setSaveRecipe,
  recipeName,
  setRecipeName,
  setSelectedSpecialRecipe,
  specialRecipes,
  exceededStocks,
  selectedSpecialRecipe,
}) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(error);
    console.log("error", error);

    error?.variant === "success" && setTimeout(() => setMessage(""));
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
        formikProps,
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

          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center mx-1 gap-1">
              <span className="font-semibold">{product.product_name}</span>
              <span className="text-sm font-light">
                {Object.entries(product.attributes)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")}
              </span>
              <span className="font-bold">{product.quantity} kg</span>
            </div>
            <span className="w-full p-2 bg-slate-50 lg:w-full my-4">
              <div className="flex gap-1 justify-between items-center p-2">
                <label id="total_production">{t("totalProduction")}: </label>
                <InputNumber
                  min={1}
                  defaultValue={otherInputs?.total_production ?? 1}
                  onChange={(value) =>
                    setOtherInputs((prev) => {
                      return { ...prev, total_production: value };
                    })
                  }
                />
              </div>

              <div className="flex gap-1 justify-between items-center p-2">
                <label id="total_bunker">{t("total_bunker")}: </label>
                <InputNumber
                  min={1}
                  defaultValue={otherInputs?.total_bunker ?? 1}
                  onChange={(value) =>
                    setOtherInputs((prev) => {
                      return { ...prev, total_bunker: value };
                    })
                  }
                />
              </div>
              <div className="flex gap-1 justify-between items-center p-2">
                <label id="wastage_percentage">
                  {t("wastage_percentage")}:{" "}
                </label>
                <Select
                  name="wastage_percentage"
                  defaultValue={otherInputs?.wastage_percentage ?? 0}
                  style={{ width: 120 }}
                  onChange={(value) =>
                    setOtherInputs((prev) => {
                      return { ...prev, wastage_percentage: value };
                    })
                  }
                  options={Array.from({ length: 20 }, (_, index) => index).map(
                    (number) => ({
                      value: `${number}`,
                      label: `${number}`,
                    })
                  )}
                />
              </div>
            </span>

            <div className="flex gap-3 justify-between items-center p-2">
              <label id="specialRecipe">{t("registeredRecipes")}: </label>
              <Select
                name="specialRecipe"
                // defaultValue={}
                value={selectedSpecialRecipe}
                style={{ width: 120 }}
                onChange={(value) => setSelectedSpecialRecipe(value)}
                options={Object.entries(specialRecipes).map(
                  ([key, val, index]) => ({
                    key: val.id,
                    value: JSON.stringify(val.details),
                    label: val.name,
                    name: val.name,
                  })
                )}
              />
            </div>

            <div className="mt-2 -mb-4 text-lg font-medium">
              1 bunker için gerekli miktar {"(1500-2400 kg)"}:
            </div>
          </div>

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
                  <div className="flex flex-col" key={index}>
                    <div
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
                      />
                    </div>
                    {exceededStocks !== null &&
                      exceededStocks[value.id.toString()] !== undefined && (
                        <div className=" flex mt-2 mb-2 p-1 font-normal text-sm text-red-600 bg-slate-50">
                          * {value.name} : {t("exceedStockValue")} {value.stock}{" "}
                          kg
                        </div>
                      )}
                  </div>
                );
              })}

              {children}
            </div>
            <div className="flex w-full items-center px-8 py-4 mt-4 bg-slate-50">
              <span className="w-2/5">{t("saveRecipe")}</span>
              <span className=" w-3/5">
                <Input
                  placeholder={saveRecipe ? t("recipeName") : ""}
                  type="text"
                  onChange={(e) => setRecipeName(e.target.value)}
                  disabled={!saveRecipe}
                  prefix={
                    <span className="pr-3">
                      <Switch
                        className="bg-gray-500"
                        title="hey"
                        onChange={(checked) => setSaveRecipe(checked)}
                      />
                    </span>
                  }
                />
              </span>
            </div>
            <FormError
              error={message?.message ?? message}
              variant={message?.variant ?? "danger"}
            />
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

export default SendToProductionForm;
