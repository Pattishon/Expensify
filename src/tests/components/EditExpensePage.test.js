import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let wrapper, editExpenseSpy, removeExpenseSpy, historySpy;

beforeEach(() => {
  editExpenseSpy = jest.fn();
  removeExpenseSpy = jest.fn();
  historySpy = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpenseSpy}
      removeExpense={removeExpenseSpy}
      history={historySpy}
      expense={expenses[1]}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit prop", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
  expect(editExpenseSpy).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
  expect(historySpy.push).toHaveBeenLastCalledWith("/");
});
test("should handle removeExpense prop", () => {
  wrapper.find("button").simulate("click");
  expect(removeExpenseSpy).toHaveBeenLastCalledWith(expenses[1].id);
  expect(historySpy.push).toHaveBeenLastCalledWith("/");
});
