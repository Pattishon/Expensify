export default expenses =>
  expenses.map(({ amount }) => amount).reduce((sum, value) => sum + value, 0);
