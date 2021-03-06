import { Actions } from "../actions/expenses";

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      const fileredExpenses = state.filter(({ id }) => id !== action.id);
      return fileredExpenses;
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else return expense;
      });
    case Actions.SET_EXPENSES:
      return action.expenses;
    default:
      return state;
  }
};
