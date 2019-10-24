import { createStore, combineReducers } from "redux";
import uuid from "uuid";

//Actions

const addExpense = (
  expense = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0
  }
) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    ...expense
  }
});

const removeExpense = id => ({
  type: "REMOVE_EXPENSE",
  id
});

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

const setTextFilter = (text = "") => ({
  type: "SET_SEARCH_TEXT",
  text
});

const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

const setStartDate = startDate => ({
  type: "SET_START_DATE",
  startDate
});

const setEndDate = endDate => ({
  type: "SET_END_DATE",
  endDate
});

//Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
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
        } else expense;
      });
    default:
      return state;
  }
};

//Filters Reducer

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return {
        ...state,
        text: action.text
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
//Get visible expanses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
//Store Creation

const store = createStore(
  combineReducers({ expenses: expensesReducer, filters: filtersReducer })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpanses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpanses);
});

const expOne = store.dispatch(
  addExpense({ description: "czynsz", amount: 75000, createdAt: -1000 })
);
const expTwo = store.dispatch(
  addExpense({ description: "kawa", amount: 300000, createdAt: 1000 })
);

// store.dispatch(removeExpense(expOne.expense.id));
// store.dispatch(editExpense(expTwo.expense.id, { amount: 400 }));

// store.dispatch(setTextFilter("czynsz"));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1900));
// store.dispatch(setEndDate());

const demoState = {
  expenses: [
    {
      id: "kahb4",
      description: "czynsz",
      notes: "ostatni czynsz za wynajmowane mieszkanie",
      amount: 77500, //w groszach, żeby uniknąć problemów z zaokrąglaniem
      createdAt: 0
    }
  ],
  filers: {
    text: "rent",
    sortBy: "amount", //date/amount
    startDate: undefined,
    endDate: undefined
  }
};

// const user = {
//   name: 'PAtti',
//   age: 29,
// };

// console.log({
//   ...user,
// });
