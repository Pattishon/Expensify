import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from "../../actions/filters";
import moment from "moment";

test("should generate setTextFilter action obj", () => {
  const text = "test search text";
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: "SET_SEARCH_TEXT",
    text
  });
});

test("should generate sort by amount actin obj", () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: "SORT_BY_AMOUNT"
  });
});

test("should generate sort by date action obj", () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: "SORT_BY_DATE"
  });
});

test("should generate set Start Date action obj", () => {
  const startDate = moment(0).valueOf;
  const action = setStartDate(startDate);
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate
  });
});

test("should generate set End Date action obj", () => {
  const endDate = moment(0).valueOf;
  const action = setEndDate(endDate);
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate
  });
});
