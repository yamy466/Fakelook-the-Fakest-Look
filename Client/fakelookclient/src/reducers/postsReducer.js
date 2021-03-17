import types from "../enviroments/actionTypes";

const posts = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return action.payload;
    case types.ADD_POST:
      return [...state, action.payload];
    case types.ADD_LIKE:
      const {postId,userId} = action.payload;
     const post = state.find(p => p.id === postId);
     post.likes = post.likes ? [...post.likes,userId] : [userId]
     state.splice(state.findIndex(p => p.id === postId),1,post)
      return [...state];
    default:
      break;
  }
  if (action.type === types.FETCH_POSTS) {
  }

  return state;
};

export default posts;
