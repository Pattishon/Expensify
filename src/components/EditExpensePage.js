import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

export const EditExpensePage = props => {
  const handleSubmit = expense => {
    props.startEditExpense(props.expense.id, expense);
    props.history.push("/");
  };
  const handleRemove = () => {
    props.startRemoveExpense(props.expense.id);
    props.history.push("/");
  };
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h2 className="page-header__title">Edit Expense</h2>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm onSubmit={handleSubmit} expense={props.expense} />
        <button className="button button--secondary" onClick={handleRemove}>
          Remove Expense
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      expense => expense.id === props.match.params.id
    )
  };
};
const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: id => dispatch(startRemoveExpense(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
