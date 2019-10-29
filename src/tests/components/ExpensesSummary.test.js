import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";

test("should render ExpensesSummary for 1 expense correctly", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={1} expensesTotal={123} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary for multiple expenses correctly", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={23} expensesTotal={123342.41} />
  );
  expect(wrapper).toMatchSnapshot();
});
