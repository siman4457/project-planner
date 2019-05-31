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

    case "LOGOUT_SUCCESS":
      console.log("Logged out successfuly");
      // return {
      //   ...state,
      //   authError: null
      // };
      return state;

    case "LOGOUT_ERROR":
      console.log("Logout error ");
      return {
        ...state,
        authError: "Logout failed"
      };

    case "SIGNUP_SUCCESS":
      console.log("Signed up successfully");
      return {
        ...state,
        authError: null
      };

    case "SIGNUP_ERROR":
      console.log("There was an error in the sign up process");
      return {
        ...state,
        authError: action.err.message //we passed in err in the authActions for this case
      };

    default:
      return state;
  }
};

export default authReducer;
