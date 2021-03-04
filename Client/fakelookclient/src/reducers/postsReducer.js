import types from "../enviroments/actionTypes";

const PostsReducer = (state = [], action) => {
  if (action.type === types.FETCH_POSTS) {
    console.log("in posts");
    return action.payload;
  }

  return state;
};

export default PostsReducer;
