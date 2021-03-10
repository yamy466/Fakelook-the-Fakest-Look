import types from "../enviroments/actionTypes";

const posts = (state = [], action) => {
  if (action.type === types.FETCH_POSTS) {
    return action.payload
  }

  return state;
};

export default posts;