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
      <div className="page-header">
        <div className="content-container">
          <h2 className="page-header__title">Add Expense</h2>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm onSubmit={handleSubmit} />
      </div>
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
