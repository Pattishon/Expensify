import filtersReducer from "../../reducers/filters";
import moment from "moment";

test("should generate the default state", () => {
  const action = { type: "@@INIT" };
  const state = filtersReducer(undefined, action);
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set search text", () => {
  const text = "search text";
  const action = { type: "SET_SEARCH_TEXT", text };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});

test("should set sortBy to amount", () => {
  const action = { type: "SORT_BY_AMOUNT" };
  const state = filtersReducer(undefined, action);
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const initialState = {
    text: "",
    sortBy: "amount",
    startDate: null,
    endDate: null
  };
  const action = { type: "SORT_BY_DATE" };
  const state = filtersReducer(initialState, action);
  expect(state.sortBy).toBe("date");
});

test("sould set StartDate", () => {
  const startDate = moment(0);
  const action = { type: "SET_START_DATE", startDate };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(startDate);
});

test("should set EndDate", () => {
  const endDate = moment(100);
  const action = { type: "SET_END_DATE", endDate };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(endDate);
});
