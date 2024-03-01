import FormikForm from "@/components/FormikForm";

import { useUser } from "@/store/hooks/user";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {  useExpensesClasses } from "@/store/hooks/apps";
import {
  addExpenseItem,
} from "@/store/actions/apps";
import { addExpenseItemToDB } from "@/services/expenses";

const CreateExpenseItem = ({ closeModal, editing = false, selected }) => {
  const user = useUser();
  const expenseClasses = useExpensesClasses();
  const [error, setError] = useState("");
  const { t } = useTranslation();
  console.log("expense classes: ", expenseClasses);
  const initialValues = {
    class_id: {
      tag: "select",
      label: t("itemclassname"),
      value: 0,
      readOnly: editing,
      options: (() => {
        const initialOptions = [
          {
            key: 0,
            value: t("choose"),
          },
        ];

        const changedProducts = expenseClasses.map((item) => ({
          key: item.id,
          value: item.name,
        }));

        return initialOptions.concat(changedProducts);
      })(),
    },
    name: {
      tag: "input",
      type: "text",
      placeholder: t("expenseitemname"),
      label: t("expenseitemname"),
      value: "",
      min: 0,
    },
    frequency: {
      tag: "input",
      type: "number",
      placeholder: t("frequency"),
      label: t("frequency"),
      value: 1,
      min: 0,
    },
  };

  const validate = (values) => {
    const errors = {};
    if (!values.class_id) errors.class_id = "Required";
    if (!values.name) errors.name = "Required";
    if (!values.frequency) errors.frequency = "Required";

    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setError("");
    setSubmitting(true);
    console.log(values, ": createexpense items values");
    try {
      const response = await addExpenseItemToDB(
        user.tokens.access_token,
        values
      );

      if (response?.error) {
         console.log(response.error)
        return setError(response.error);
      }

      addExpenseItem(response);
      setSubmitting(false);
      closeModal();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      error={error}
      title={t("addExpenseItem")}
    />
  );
};

export default CreateExpenseItem;
