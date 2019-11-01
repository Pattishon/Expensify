import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let wrapper, editExpenseSpy, startRemoveExpenseSpy, historySpy;

beforeEach(() => {
  editExpenseSpy = jest.fn();
  startRemoveExpenseSpy = jest.fn();
  historySpy = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpenseSpy}
      startRemoveExpense={startRemoveExpenseSpy}
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
test("should handle startRemoveExpense prop", () => {
  wrapper.find("button").simulate("click");
  expect(startRemoveExpenseSpy).toHaveBeenLastCalledWith(expenses[1].id);
  expect(historySpy.push).toHaveBeenLastCalledWith("/");
});
