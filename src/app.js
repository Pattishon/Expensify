import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/store";
import * as ExpensesActions from "./actions/expenses";
import * as FiltersActions from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

// store.subscribe(() => {
//   const state = store.getState();
//   console.log(getVisibleExpenses(state.expenses, state.filters));
// });

store.dispatch(
  ExpensesActions.addExpense({
    description: "Rachunek za prąd",
    amount: 7000,
    createdAt: 0
  })
);
store.dispatch(
  ExpensesActions.addExpense({
    description: "Netflix",
    amount: 4500,
    createdAt: 100
  })
);
store.dispatch(
  ExpensesActions.addExpense({
    description: "Rachunek za internet",
    amount: 9000,
    createdAt: -100
  })
);
// store.dispatch(
//   ExpensesActions.editExpense("8d50c145-1be4-4a21-8315-2820d02bf5f1", {
//     amount: 4500,
//     createdAt: 100,
//     description: "Netflix",
//     note: undefined
//   })
// );

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("root"));
