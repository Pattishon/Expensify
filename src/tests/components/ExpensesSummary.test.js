import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";

test("should render ExpensesSummary for 1 expense correctly", () => {
  const wrapper = shallow(<ExpensesSummary expenses={[expenses[1]]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary for 2 expense correctly", () => {
  const wrapper = shallow(
    <ExpensesSummary expenses={[expenses[1], expenses[2]]} />
  );
  expect(wrapper).toMatchSnapshot();
});
