import { addExpense, removeExpense, editExpense } from "../../actions/expenses";
import moment from "moment";

test("should generate remove expense action object", () => {
  const action = removeExpense("123abc");
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should generate add expense action object", () => {
  const expense = {
    description: "test",
    note: "test note",
    amount: 100,
    createdAt: moment(0)
  };
  const action = addExpense(expense);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      ...expense
    }
  });
});

test("shpuld generate add expense action obj with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: 0
    }
  });
});

test("should generate edit expense action obj", () => {
  const updates = { note: "changed note" };
  const action = editExpense("123abc", updates);
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates
  });
});
