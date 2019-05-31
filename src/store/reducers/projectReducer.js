//We need a initState to pass in the first time around
const initState = {
  projects: [
    { id: "1", title: "help me find peach", content: "blah blach blah" },
    { id: "2", title: "collect all the stars", content: "blah blach blah" },
    { id: "3", title: "egg hunt with yoshi", content: "blah blach blah" }
  ]
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      //console.log("created project", action.project);
      return state;
    case "CREATE_PROJECT_ERROR":
      //console.log("create project error", action.err);
      return state;

    case "DELETE_PROJECT":
      return state;

    case "DELETE_PROJECT_ERROR":
      return state; //not sure about this. might want to return the error

    default:
      return state;
  }
};

export default projectReducer;
