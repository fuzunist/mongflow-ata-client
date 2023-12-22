import { useState, useEffect } from "react";
import {
  useExpensesClasses,
  useExpensesItems,
  useMonthlyExpenses,
} from "@/store/hooks/apps";
import { useUser } from "@/store/hooks/user";
import { useTranslation } from "react-i18next";

import { editExpenses, addExpenseItems } from "@/store/actions/apps";
import ExpensesForm from "@/components/FormikForm/ExpensesForm";
import { updateExpensesToDB } from "@/services/expenses";

const Expenses = () => {
  const [error, setError] = useState("");
  const [initVals, setInitVals] = useState({});
  const [expense, setExpense] = useState(0);
  const { t, i18n } = useTranslation();

  const [successMessage, setSuccessMessage] = useState("");
  const user = useUser();

  const expensesClasses = useExpensesClasses();
  const expensesItems = useExpensesItems();
  const monthlyExpenses = useMonthlyExpenses();
  console.log("expensesClasses", expensesClasses);
  console.log("expensesItems", expensesItems);
  console.log("monthlyExpenses", monthlyExpenses);

  // useEffect(() => {

  //   const initialValues = {};

  //   monthlyExpenses?.forEach((row) => {
  //     initialValues[String(row.id)] = {
  //       id: row.id,
  //       name: row.material,
  //       label: row.material,
  //       tag: "input",
  //       type: "number",
  //       placeholder: "Maliyet girin (TL/kg)",
  //       value: row.cost ?? "",
  //       min: 0,
  //     };
  //   });
  //   setInitVals(initialValues);
  // }, []);

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
      value: monthlyExpenses[0]?.monthly_expenses[row.id] || "",
      min: 0,
    };
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true)
      setError("")
      const data = {
        ...monthlyExpenses[0],
        monthly_expenses: values,
      };

      for(const key in data.monthly_expenses){
        //  console.log("xxx.:",key, data.monthly_expenses[key])
      }

       console.log("data of post expense: ", data)
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

      setSubmitting(false)
      console.log(response, "response data tosend expnse");
    } catch (err) {
      setSubmitting(false)
      console.log(err);
      setError(err);
    }
  };

  return (
    <>
      <ExpensesForm
        className={"flex flex-row "}
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
    </>
  );
};

export default Expenses;
