import {
  getAllPosts,
  addLike as addLikeService,
  addNewPost,
  getFilteredPosts as getFilteredPostsService,
} from "../services/postsService";
import types from "../enviroments/actionTypes";

export const fetchPosts = () => async (dispatch, getState) => {
  try {
    const res = await getAllPosts(getState().login.accessToken);
    dispatch({ type: types.FETCH_POSTS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const addPost = post => async dispatch => {
  try {
    const res = await addNewPost(post);
    dispatch({
      type: types.ADD_POST,
      payload: { ...res.data.dataValues, photoURL: post.photo },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getFilteredPosts = filters => async (dispatch, getState) => {
  dispatch({ type: types.FILTER_LOADING });
  let res;
  try {
    res = await getFilteredPostsService({ filters });
    dispatch({ type: types.FETCH_POSTS, payload: res.data });
    dispatch({ type: types.FILTER_SUCCESS });
  } catch (error) {
    dispatch({ type: types.FILTER_ERROR });
    console.error(error);
  }
};

export const addLike = (postId,type) => async (dispatch, getState) => {
  try {
    await addLikeService(postId,type);
    dispatch({ type: types.ADD_LIKE, payload: { userId: getState().login.userId, postId } });
  } catch (err) {
    console.error(err);
  }
};
