import moment from "moment";

export default [
  {
    id: "1",
    description: "gum",
    note: "",
    amount: 100,
    createdAt: moment(0).valueOf()
  },
  {
    id: "2",
    description: "rent",
    note: "",
    amount: 30000,
    createdAt: moment(0)
      .subtract(4, "days")
      .valueOf()
  },
  {
    id: "3",
    description: "car",
    note: "",
    amount: 4500,
    createdAt: moment(0)
      .add(4, "days")
      .valueOf()
  }
];
