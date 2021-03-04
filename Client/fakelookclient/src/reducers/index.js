import PostsReducer from "./postsReducer";
import { combineReducers } from "redux";
import LocationReducer from "./locationsReducer";

export default combineReducers({
  posts: PostsReducer,
  selectedLocation: LocationReducer 
});
