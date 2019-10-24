import { createStore } from "redux";

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy
});

const decrementCount = (decrementBy = 1) => ({
  type: "DECREMENT",
  decrementBy
});

const setCount = ({ setTo } = {}) => ({
  type: "SET",
  setTo
});

const resetCount = () => ({
  type: "RESET"
});

const countRecucer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    case "RESET":
      return {
        count: 0
      };
    case "SET":
      return {
        count: action.setTo
      };
    default:
      return state;
  }
};

const store = createStore(countRecucer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 100 }));
store.dispatch(incrementCount());
store.dispatch(resetCount());
store.dispatch(decrementCount(13));
store.dispatch(decrementCount());
store.dispatch(setCount({ setTo: 55 }));
