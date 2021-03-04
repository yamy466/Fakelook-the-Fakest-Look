import types from "../enviroments/actionTypes";
import PostsService from "../services/postsService";

export const fetchPosts = () => async (dispatch) => {
  const response = await PostsService.getAllPosts();
  console.log(response.data, "at actions - data");
  dispatch({ type: types.FETCH_POSTS, payload: response.data });
};

export const selectLocation = (location) => async (dispatch) => {
  console.log("in select location");
  dispatch({type:types.SELECTED_LOCATION,payload: location})
}


