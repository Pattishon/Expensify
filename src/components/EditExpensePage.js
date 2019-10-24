import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

export const EditExpensePage = props => {
  const handleSubmit = expense => {
    props.editExpense(props.expense.id, expense);
    props.history.push("/");
  };
  const handleRemove = () => {
    props.removeExpense(props.expense.id);
    props.history.push("/");
  };
  return (
    <div>
      <ExpenseForm onSubmit={handleSubmit} expense={props.expense} />
      <button onClick={handleRemove}>remove</button>
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
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: id => dispatch(removeExpense(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
