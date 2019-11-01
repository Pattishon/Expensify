import moment from "moment";
import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";
import { Actions } from "../../actions/expenses";

test("should generate default expenses state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should add expense to the state", () => {
  const expense = {
    id: 1,
    description: "coke",
    note: "",
    amount: 300,
    createdAt: moment(0).valueOf()
  };
  const action = { type: "ADD_EXPENSE", expense };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test("should remove expense from state", () => {
  const action = { type: "REMOVE_EXPENSE", id: 1 };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1], expenses[2]]);
});

test("should set expenses to fixture data", () => {
  const initData = expenses[2];
  const action = { type: Actions.SET_EXPENSES, expenses };
  const state = expensesReducer(initData, action);
  expect(state).toEqual(expenses);
});
