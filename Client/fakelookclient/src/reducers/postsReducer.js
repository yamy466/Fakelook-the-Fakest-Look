import types from "../enviroments/actionTypes";

const posts = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return action.payload;
    case types.ADD_POST:
      return [...state, action.payload];
    case types.ADD_LIKE:
     const post = state.find(p => p.id === action.payload.postId);
     post.likes = post.likes ? [...post.likes,action.payload.userId] : [action.payload.userId]
      return [...state,post];
    default:
      break;
  }
  if (action.type === types.FETCH_POSTS) {
  }

  return state;
};

export default posts;
