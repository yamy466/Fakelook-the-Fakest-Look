import types from "../enviroments/actionTypes";

const groups = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_GROUPS:
      return action.payload;
    default:
      break;
  }
  return state;
};

export default groups;
