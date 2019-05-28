//We need a initState to pass in the first time around
const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("successfuly logged in!");
      return {
        ...state,
        authError: null
      };
    case "LOGIN_ERROR":
      console.log("login failed. Please try again");
      return {
        ...state,
        authError: "Login failed"
      };
    default:
      return state;
  }
};

export default authReducer;
