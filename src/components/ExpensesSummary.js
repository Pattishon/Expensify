import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = props => {
  return (
    <div>
      <h4>
        Viewing {props.expensesCount}{" "}
        {props.expensesCount === 1 ? "expense" : "expenses"} totalling{" "}
        {numeral(props.expensesTotal / 100).format("$0,0.00")}
      </h4>
    </div>
  );
};

const mapStateToProps = state => ({
  expensesCount: selectExpenses(state.expenses, state.filters).length,
  expensesTotal: getExpensesTotal(selectExpenses(state.expenses, state.filters))
});

export default connect(mapStateToProps)(ExpensesSummary);
