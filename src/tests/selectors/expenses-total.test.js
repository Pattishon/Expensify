import selectExpenseTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should return 0 if no expenses", () => {
  expect(selectExpenseTotal([])).toBe(0);
});

test("should return total amount for single expense", () => {
  expect(selectExpenseTotal([expenses[0]])).toBe(100);
});

test("should return total amount for multiple expenses", () => {
  expect(selectExpenseTotal(expenses)).toBe(34600);
});
