import posts from "./postsReducer";
import { combineReducers } from "redux";
import selectedLocation from "./locationsReducer";
import login from "./loginReducer";
import register from "./registerReducer";
import path from "./pathReducer";
import social from "./socialReducer";
import photoTags from "./tagsReducer";
import users from "./usersReducer";

export default combineReducers({
  posts,
  selectedLocation,
  login,
  register,
  path,
  social,
  photoTags,
  users,
});
