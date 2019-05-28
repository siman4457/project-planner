import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,

  /*In the background, this reducer is automatically
   going to sync the 'firestore' property on the state object
   to our data in the database*/
  firestore: firestoreReducer,

  /*Import the firebase reducer so that we can add the status
  of a user to our app's state*/
  firebase: firebaseReducer
});

export default rootReducer;
