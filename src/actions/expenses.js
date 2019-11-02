import uuid from "uuid";
import database from "../firebase/firebase";

export const Actions = {
  EDIT_EXPENSE: "EDIT_EXPENSE",
  SET_EXPENSES: "SET_EXPENSES",
  REMOVE_EXPENSE: "REMOVE_EXPENSE"
};

//ADD

export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense: {
    ...expense
  }
});

export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    return database
      .ref("expenses")
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};

//REMOVE

export const removeExpense = id => ({
  type: Actions.REMOVE_EXPENSE,
  id
});

export const startRemoveExpense = id => {
  return dispatch => {
    return database
      .ref(`expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense(id));
      });
  };
};

//EDIT

export const editExpense = (id, updates) => ({
  type: Actions.EDIT_EXPENSE,
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return dispatch => {
    return database
      .ref(`expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

//SET

export const setExpenses = expenses => ({
  type: Actions.SET_EXPENSES,
  expenses
});

export const startSetExpenses = () => {
  return dispatch => {
    return database
      .ref("expenses")
      .once("value")
      .then(snapshot => {
        const expenses = [];

        snapshot.forEach(childSnapshot => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setExpenses(expenses));
      });
  };
};
