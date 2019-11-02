import { Actions } from "../actions/auth";

export default (state = {}, action) => {
  switch (action.type) {
    case Actions.LOGIN:
      return {
        uid: action.uid
      };
    case Actions.LOGOUT:
      return {};
    default:
      return state;
  }
};
