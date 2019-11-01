import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";

export const AddExpensePage = props => {
  const handleSubmit = expense => {
    props.startAddExpense(expense);
    props.history.push("/");
  };
  return (
    <div>
      <h1>Add Expense</h1>
      <ExpenseForm onSubmit={handleSubmit} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startAddExpense: expense => dispatch(startAddExpense(expense))
});

export default connect(
  null,
  mapDispatchToProps
)(AddExpensePage);
