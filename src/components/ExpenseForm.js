import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

const now = moment();

class ExpenseForm extends React.Component {
  // state = {
  //   description: "",
  //   amount: "",
  //   note: "",
  //   createdAt: moment(),
  //   calendarFocused: false,
  //   error: ""
  // };

  // componentDidMount() {
  //   if (this.props.expense) {
  //     console.log(this.props.expense);
  //     this.setState(() => ({
  //       ...this.state,
  //       ...this.props.expense//przeparsować
  //     }));
  //   }
  // }
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      note: props.expense ? props.expense.note : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ""
    };
  }

  handleDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  handleNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  handleAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  //calendar handlers
  handleDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  handleFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  //submit handler
  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: "Please provide description and amount" }));
    } else {
      const { description, amount, note, createdAt } = this.state;
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description,
        amount: parseFloat(amount, 10) * 100,
        note,
        createdAt: createdAt.valueOf()
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          className="text-input"
          type="text"
          placeholder="Description"
          autoFocus
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <input
          className="text-input"
          type="text"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.handleAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.handleDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.handleFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          className="textarea"
          placeholder="Add a note for the expense (optional)"
          value={this.state.note}
          onChange={this.handleNoteChange}
        ></textarea>
        <div>
          <button className="button">
            {this.props.expense ? "Save changes" : "Add Expense"}
          </button>
        </div>
      </form>
    );
  }
}

export default ExpenseForm;
