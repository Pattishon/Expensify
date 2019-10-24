import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";

let wrapper,
  setStartDateSpy,
  setEndDateSpy,
  setTextFilterSpy,
  sortByDateSpy,
  sortByAmountSpy;

beforeEach(() => {
  setStartDateSpy = jest.fn();
  setEndDateSpy = jest.fn();
  setTextFilterSpy = jest.fn();
  sortByDateSpy = jest.fn();
  sortByAmountSpy = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters
      setStartDate={setStartDateSpy}
      setEndDate={setEndDateSpy}
      setTextFilter={setTextFilterSpy}
      sortByDate={sortByDateSpy}
      sortByAmount={sortByAmountSpy}
      filters={filters}
    />
  );
});

test("should render ExpenseListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with altFilters correctly", () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test("should set start and end date on date change", () => {
  const startDate = altFilters.startDate;
  const endDate = altFilters.endDate;
  wrapper.find("DateRangePicker").prop("onDatesChange")({ startDate, endDate });
  expect(setStartDateSpy).toHaveBeenLastCalledWith(startDate);
  expect(setEndDateSpy).toHaveBeenLastCalledWith(endDate);
});

test("should set calendarFocused on focus change", () => {
  const calendarFocused = "startDate";
  wrapper.find("DateRangePicker").prop("onFocusChange")(calendarFocused);
  expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});

test("should handle setTextFilter", () => {
  const value = altFilters.text;
  wrapper.find("input").simulate("change", { target: { value } });
  expect(setTextFilterSpy).toHaveBeenLastCalledWith(value);
});

test("should sort by date", () => {
  wrapper.setProps({
    sortBy: "amount"
  });
  const value = "date";
  wrapper.find("select").simulate("change", {
    target: { value }
  });
  expect(sortByDateSpy).toHaveBeenCalled();
});

test("should sort by amount", () => {
  const value = "amount";
  wrapper.find("select").simulate("change", {
    target: { value }
  });
  expect(sortByAmountSpy).toHaveBeenCalled();
});
