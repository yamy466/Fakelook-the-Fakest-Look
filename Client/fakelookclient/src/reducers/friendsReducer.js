import types from "../enviroments/actionTypes";

const friends = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_FRIENDS:
      return action.payload;
    default:
      break;
  }
  return state;
};

export default friends;
