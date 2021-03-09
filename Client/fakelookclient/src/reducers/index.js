import posts from "./postsReducer";
import { combineReducers } from "redux";
import selectedLocation from "./locationsReducer";
import login from "./loginReducer";
import register from "./registerReducer";

export default combineReducers({
  posts,
  selectedLocation ,
  login,
  register
});
