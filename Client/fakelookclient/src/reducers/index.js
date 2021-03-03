import PostsReducer from "./postsReducer";
import { combineReducers } from "redux";

export default combineReducers({
  posts: PostsReducer,
});
