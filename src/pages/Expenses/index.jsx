import { useState, useEffect } from "react";
import {
  useExpensesClasses,
  useExpensesItems,
  useExpenses,
} from "@/store/hooks/apps";
import { useUser } from "@/store/hooks/user";
import { useTranslation } from "react-i18next";

import { editExpenses, addExpenseItems } from "@/store/actions/apps";
import ExpensesForm from "@/components/FormikForm/ExpensesForm";
import { updateExpensesToDB } from "@/services/expenses";
import { transformToFloat } from "@/utils/helpers";
import { calculateExpenses } from "@/utils/calculateExpenses";

const Expenses = () => {
  const [error, setError] = useState("");
  const [initVals, setInitVals] = useState({});
  const [expense, setExpense] = useState(0);
  const { t, i18n } = useTranslation();

  const [successMessage, setSuccessMessage] = useState("");
  const user = useUser();

  const expensesClasses = useExpensesClasses();
  const expensesItems = useExpensesItems();
  const expenses = useExpenses();
   console.log("expenses id için", expenses)

  const initialValues = {};
  expensesItems?.forEach((row) => {
    initialValues[String(row.id)] = {
      id: row.id,
      name: row.name,
      class: row.class,
      label: row.name,
      frequency: row.frequency,
      tag: "input",
      type: "decimal",
      placeholder: "Harcama Girin TL",
      value:
        transformToFloat(
          expenses[0]?.monthly_expenses[row.id] * row.frequency
        ) ?? 0,
      min: 0,
    };
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setError("");

      const monthly_expenses = { ...expenses.monthly_expenses, ...values };

      const data=calculateExpenses(monthly_expenses, expenses[0]?.id);
      // const data = {
      //   id: 1,
      //   monthly_expenses: { ...expenses.monthly_expenses, ...values },
      //   daily_expenses: {},
      //   hourly_expenses: {},
      //   monthly_cost,
      //   daily_cost,
      //   hourly_cost,
      // };

      // for (const key in expensesItems) {
      //   const expense = transformToFloat(
      //     data.monthly_expenses[expensesItems[key].id]
      //   );
      //   data.monthly_expenses[expensesItems[key].id] = transformToFloat(
      //     expense / expensesItems[key].frequency
      //   );

      //   if (expense === ("" || null)) {
      //     data.monthly_expenses[expensesItems[key].id] = 0;
      //   }
      // }

      const response = await updateExpensesToDB(user.tokens.access_token, data);
      if (response?.error) {
        console.log(response?.error);
        setError(response?.error);
        return;
      }
      editExpenses(response);
      setSuccessMessage(t("expenses_added_successfully"));
      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);

      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      console.log(err);
      setError(err);
    }
  };

  return (
    <div className="mb-4">
      <ExpensesForm
        className={"flex flex-row"}
        onSubmit={onSubmit}
        //   validate={validate}
        initialValues={initialValues}
        error={error}
        title={"Harcamaları Güncelle"}
        classes={expensesClasses}
        expensesItems={expensesItems}
        //   {t(selectedProduct ? (!!type ? 'editOtherProduct' : 'editProduct') : !!type ? 'addOtherProduct' : 'addProduct')}
      />
      {successMessage && (
        <p className="flex mt-4 text-green-500 mb-4 self-center items-center justify-center">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default Expenses;
