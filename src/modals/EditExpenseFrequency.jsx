import FormikForm from "@/components/FormikForm";

import { useUser } from "@/store/hooks/user";
import { useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { useExpensesItems, useExpenses } from "@/store/hooks/apps";
import { editExpenseItemFreq } from "@/store/actions/apps";
import { updateExpenseItemFreqToDB } from "@/services/expenses";
import { calculateExpenses } from "@/utils/calculateExpenses";

const EditExpenseFrequency = ({ closeModal, expenseItemId, ref }) => {
  const user = useUser();
  const expensesItems = useExpensesItems();
  const expenses = useExpenses();
  console.log("expensesItems", expensesItems);
  console.log("expenssss", expenses);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const initialValues = {
    [expenseItemId]: {
      id: expenseItemId,
      tag: "input",
      type: "number",
      placeholder: t("frequency"),
      label: t("frequency"),
      value: 1,
      min: 0,
    },
  };
  console.log("initialValues", initialValues);

  const validate = (values) => {
    const errors = {};
    if (!values[expenseItemId]) errors[expenseItemId] = "Required";
    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setError("");
      setSubmitting(true);
      console.log("values of submitform", values);
      const id = Object.keys(values)[0];
      const value = values[id];
      const data = {
        frequency: value,
        id: id,
      };
      console.log("data to send db", expensesItems);
      const response = await updateExpenseItemFreqToDB(
        user.tokens.access_token,
        data
      );
      console.log("updateExpenseItemFreqToDB", response);

      if (response?.error) {
        return setError(response.error);
      }

      editExpenseItemFreq(response);
      console.log("expensesItems after", expensesItems);
      console.log("response of freq edit", response);
      setSubmitting(false);
      calculateExpenses(expenses.monthly_expenses, expenses.id, expensesItems);
      closeModal();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      error={error}
      title={t("editexpensefrequency")}
      ref={ref}
    />
  );
};

export default memo(EditExpenseFrequency);
