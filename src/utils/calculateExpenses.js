export const calculateExpenses = (monthly_expenses, id) => {
  const monthly_cost = Object.values(monthly_expenses)
    .map(parseFloat)
    .reduce((acc, val) => acc + val, 0);

  const daily_expenses = {};
  const daily_cost = monthly_cost / 30;

  const hourly_expenses = {};
  const hourly_cost = monthly_cost / 720;

  for (const key in monthly_expenses) {
    const expense = parseFloat(monthly_expenses[key]);

    daily_expenses[key] = (expense / 30).toFixed(2);
    hourly_expenses[key] = (expense / 720).toFixed(2);
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
