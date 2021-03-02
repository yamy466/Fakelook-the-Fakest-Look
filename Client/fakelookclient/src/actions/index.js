import PostsService from "../services/postsService";

export const fetchPosts = () => async (dispatch) => {
  const response = await PostsService.getAllPosts();
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};
