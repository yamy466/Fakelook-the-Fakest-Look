import PostsService from "../services/postsService";

export const fetchPosts = () => async (dispatch) => {
  const response = await PostsService.getAllPosts();
  console.log(response.data, "at actions - data");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};
