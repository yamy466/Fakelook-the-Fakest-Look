import types from "../enviroments/actionTypes";

const path = (state = [], action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return "/map" ;
    case types.LOGOUT:
      return "/" ;
    case types.REGISTER_SUCCESS:
      return "/map" ;
    default:
      return state;
  }
};

export default path;
