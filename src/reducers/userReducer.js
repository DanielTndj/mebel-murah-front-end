export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      // return user information (name, email, token) and will update the state
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};
