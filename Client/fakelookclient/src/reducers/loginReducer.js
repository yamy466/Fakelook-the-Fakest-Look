import types from "../enviroments/actionTypes";

const login = (state = [], action) => {
  switch (action.type) {
    case types.LOGIN_LOADING:
      return { ...state, loginStatus: "loading" };
    case types.LOGIN_SUCCESS:
      return { ...state, loginStatus: "success", ...action.payload };
    case types.LOGIN_ERROR:
      return { ...state, loginStatus: "incorrect" };
    case types.LOGOUT:
      return {
        ...state,
        accessToken: null,
        loginStatus: "",
        refreshToken: null
      };
    case types.REFRESH_TOKEN:
      return { ...state, accessToken: action.payload };
    case types.REGISTER_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default login;
