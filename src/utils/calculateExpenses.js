import getWorkingDaysInMonth from "./getWorkingDays";
export const calculateExpenses = (monthly_expenses, id, expenseItems) => {
  console.log("monthly_expenses incalc", monthly_expenses);
  const monthly_cost = expenseItems.reduce((acc, item) => {
    const id = item.id;
    const expense = monthly_expenses[id.toString()];

    if (
      expense !== undefined &&
      item.frequency !== 0 &&
      !isNaN(parseFloat(expense))
    ) {
      acc += parseFloat(expense) / item.frequency;
    }

    return acc;
  }, 0);

  const workingDays = getWorkingDaysInMonth();
  // bu costlar monthly_cost üzerinden o ay çalışılan gün sayısına bölünüp hesaplanıyor.
  const daily_expenses = {};
  const daily_cost = monthly_cost / workingDays;

  const hourly_expenses = {};
  const hourly_cost = daily_cost / 24;

  for (const key in monthly_expenses) {
    const expense = monthly_expenses[key];

    daily_expenses[key] = (parseFloat(expense) / 30).toFixed(2);
    hourly_expenses[key] = (parseFloat(expense) / 720).toFixed(2);
  }

  const data = {
    id: id,
    monthly_expenses: { ...monthly_expenses },
    daily_expenses,
    hourly_expenses,
    monthly_cost: monthly_cost.toFixed(2),
    daily_cost: daily_cost.toFixed(2),
    hourly_cost: hourly_cost.toFixed(2),
  };

  console.log("data of expenses to send db", data);

  return data;
};
