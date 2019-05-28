import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDc3S3xawDcmPHIldlPDsBsNS1q1W2-CjM",
  authDomain: "planner-63b27.firebaseapp.com",
  databaseURL: "https://planner-63b27.firebaseio.com",
  projectId: "planner-63b27",
  storageBucket: "planner-63b27.appspot.com",
  messagingSenderId: "396356610204",
  appId: "1:396356610204:web:a081c79cf4df33f0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
