const functions = require("firebase-functions");

//Initialize admin SDK to interact with different services
//like authentication service and firestore service
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//Create Notification
const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then(doc => {
      console.log("notification added", doc);
    });
};

//Function that will react to a new project being created
exports.projectCreated = functions.firestore
  .document("projects/{projectId}")
  .onCreate(doc => {
    //Notify user that a new project has been created
    const project = doc.data();
    const content = "added a new project: " + project.title;
    const notification = {
      content: content,
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotification(notification);
  });

//Function that will react to a project being deleted
exports.projectDeleted = functions.firestore
  .document("projects/{projectId}")
  .onDelete(doc => {
    //Notify user that a project has been deleted
    const project = doc.data();
    const content = "deleted a project: " + project.title;
    const notification = {
      content: content,
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotification(notification);
  });

//Function that will react to a new user being created
exports.userJoined = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then(doc => {
      const newUser = doc.data();
      const notification = {
        content: "joined the party",
        user: `${newUser.firstName} ${newUser.lastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      };

      return createNotification(notification);
    });
});
