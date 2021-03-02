import PostsReducer from "./postsReducer";
import { combineReducers } from "redux";

export default combineReducers({
  Posts: PostsReducer,
});
