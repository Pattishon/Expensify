import authReducer from "../../reducers/auth";
import { Actions } from "../../actions/auth";

test("should generate default auth state", () => {
  const state = authReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test("should add uid to state on login", () => {
  const uid = "123abc";
  const action = {
    type: Actions.LOGIN,
    uid
  };
  const state = authReducer({}, action);
  expect(state).toEqual({
    uid
  });
});

test("should clear state on logout", () => {
  const action = {
    type: Actions.LOGOUT
  };
  const state = authReducer({ uid: "123abc" }, action);
  expect(state).toEqual({});
});
