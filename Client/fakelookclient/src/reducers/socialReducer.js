import types from "../enviroments/actionTypes";

const social = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_REQUESTS:
      return action.payload;
    case types.ADD_FRIEND:
      return action.payload;
    case types.DECLINE_REQUEST:
      return action.payload;
    default:
      break;
  }
  return state;
};

export default social;