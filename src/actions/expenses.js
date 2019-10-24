import uuid from "uuid";

export const addExpense = (
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

export const removeExpense = id => ({
  type: "REMOVE_EXPENSE",
  id
});

export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});
