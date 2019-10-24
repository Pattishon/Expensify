import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import moment from "moment";

test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with data correctly", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid data", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper.state("error").length).toBe(0);

  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
});

test("should set description on input change", () => {
  const value = "changed description";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("description")).toBe(value);
});

test("should set note on input change", () => {
  const value = "changed note";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("textarea").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("note")).toBe(value);
});

test("should set amount if valid input", () => {
  const value = "22.14";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe(value);
});

test("should not set amount if invalid input", () => {
  const value = "22.1412";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe("");
});

test("should call onSubmit prop for valid form submission", () => {
  const expense = expenses[1];
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expense} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expense.description,
    amount: expense.amount,
    note: expense.note,
    createdAt: expense.createdAt
  });
});

test("should set new date on date change", () => {
  const createdAt = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("SingleDatePicker").prop("onDateChange")(createdAt);
  expect(wrapper.state("createdAt")).toEqual(createdAt);
});

test("should set calendarFocused on focus change", () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
