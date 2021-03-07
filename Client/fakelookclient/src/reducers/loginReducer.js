import types from "../enviroments/actionTypes";

const LoginReducer = (state = null, action) => {
    if (action.type === types.LOGIN_CHANGE) {
      console.log("in login change");
      return action.payload;
    }
  
    return state;
  };
  
  export default LoginReducer;