import { firebase, googleAuthProvider } from "../firebase/firebase";

export const Actions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT"
};

export const login = uid => ({
  type: Actions.LOGIN,
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: Actions.LOGOUT
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
