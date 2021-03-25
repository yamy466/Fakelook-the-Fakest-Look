import types from "../enviroments/actionTypes";

const login = (state = [], action) => {
  switch (action.type) {
    case types.LOGIN_LOADING:
      return { ...state, loginStatus: "loading" };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus: "success",
        username: action.payload.username,
        userId: action.payload.userId,
      };
    case types.LOGIN_ERROR:
      return { ...state, loginStatus: "incorrect" };
    case types.LOGOUT:
      return { ...state, loginStatus: "", username: "", userId: "" };
    case types.REGISTER_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default login;
