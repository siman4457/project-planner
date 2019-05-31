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

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(dispatch({ type: "LOGOUT_SUCCESS" }))
      .catch(err => {
        dispatch({ type: "LOGOUT_ERROR" });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    //We can only add the email and password of a new user to Firebase auth
    firebase
      .auth()
      //Creat the new user in firebase Auth
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      //Creating a new user in firebase Auth returns a promise so we can tack on a then.
      //Here we grab the newly generated UID for the new user and set it as the document id for
      //the new Firestore entry.
      .then(response => {
        let newUserUID = response.user.uid;
        return firestore
          .collection("users")
          .doc(newUserUID)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0]
          });
      })
      //Adding a Firestore entry returns a promise so we can tack on another then.
      //Here we dispatch our action
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });

    //We need to add the user's info in Firestore
  };
};
