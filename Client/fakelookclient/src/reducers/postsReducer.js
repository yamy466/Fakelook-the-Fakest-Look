import types from "../enviroments/actionTypes";

const posts = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return action.payload;
    case types.ADD_POST:
      return [...state, action.payload];
    default:
      break;
  }
  if (action.type === types.FETCH_POSTS) {
  }

  return state;
};

export default posts;
