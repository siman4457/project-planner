//This is our action creator
export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    /****** USING THUNK, HALT AND MAKE ASYNC CALL TO AUTH SERVICE ******/
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err: err });
      });
  };
};
