import types from "../enviroments/actionTypes";

const register = (state = [], action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return { ...state, ...action.payload, registerStatus: "success", registerError: null };
    case types.REGISTER_LOADING:
      return { ...state, registerStatus: "loading", registerError: null };
    case types.REGISTER_ERROR:
      return { ...state, registerStatus: "error", registerError: action.payload };
    default:
      return state;
  }
};

export default register;
