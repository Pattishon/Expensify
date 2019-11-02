import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  removeExpense,
  editExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense,
  Actions
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref("expenses")
    .set(expensesData)
    .then(() => done());
});

test("should generate remove expense action object", () => {
  const action = removeExpense("123abc");
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should remove expense from store and firebase", done => {
  const store = createMockStore({});
  const id = expenses[0].id;
  store
    .dispatch(startRemoveExpense(id))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: Actions.REMOVE_EXPENSE,
        id
      });
      return database.ref(`expenses/${actions[0].id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should generate add expense action object", () => {
  const expense = expenses[2];
  const action = addExpense(expense);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense
  });
});

test("should add expense to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "mouse",
    amount: "3000",
    note: "testing by mouse",
    createdAt: 10000
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults to database and store", done => {
  const store = createMockStore({});
  const defaultData = { description: "", note: "", amount: 0, createdAt: 0 };
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...defaultData
        }
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(defaultData);
      done();
    });
});

test("should generate edit expense action obj", () => {
  const updates = { note: "changed note" };
  const action = editExpense("123abc", updates);
  expect(action).toEqual({
    type: Actions.EDIT_EXPENSE,
    id: "123abc",
    updates
  });
});

test("should edit expense in store and firebase", done => {
  const store = createMockStore();
  const { id } = expenses[1];
  const updates = { note: "changed note for firebase" };

  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: Actions.EDIT_EXPENSE,
        id,
        updates
      });
      return database.ref(`expenses/${actions[0].id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val().note).toBe(updates.note);
      done();
    });
});

test("should generate setExpenses action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should fetch the expenses from firebase", () => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(done => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: Actions.SET_EXPENSES,
      expenses
    });
    done();
  });
});
