import PostsReducer from "./postsReducer";
import { combineReducers } from "redux";
import LocationReducer from "./locationsReducer";
import LoginReducer from "./loginReducer";

export default combineReducers({
  posts: PostsReducer,
  selectedLocation: LocationReducer ,
  loggedInUser: LoginReducer
});
