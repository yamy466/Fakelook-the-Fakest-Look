import types from "../enviroments/actionTypes";
import PostsService from "../services/postsService";

export const fetchPosts = () => async (dispatch) => {
  const response = await PostsService.getAllPosts();
  console.log(response.data, "at actions - data");
  dispatch({ type: types.FETCH_POSTS, payload: response.data });
};

export const selectLocation = (location) => async (dispatch) => {
  dispatch({type:types.SELECTED_LOCATION,payload: location})
}

export const loginChange = (user) => async (dispatch) => {
  dispatch ({type: types.LOGIN_CHANGE, payload: user })
}


