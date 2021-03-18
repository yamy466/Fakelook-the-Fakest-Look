import types from "../enviroments/actionTypes";
import PostsService from "../services/postsService";
import SocialServices from "../services/socialServices";
import { getUsersByQuery as getUsersByQueryService } from "../services/usersService";
import {
  addTag as addTagService,
  getTagsByQuery as getTagsByQueryService,
} from "../services/tagsService";
import {
  login as loginService,
  refreshToken as refreshTokenService,
  logout as logoutService,
  register as registerService,
} from "../services/authService";
import actionErrorHandler from "../helpers/actionsErrorHandler";

export const fetchPosts = () => async (dispatch, getState) => {
  const fetch = async () => await PostsService.getAllPosts(getState().login.accessToken);
  let res;
  try {
    res = await fetch();
  } catch ({ response }) {
    res = await actionErrorHandler(response, fetch, null, dispatch, getState);
  }
  if (res?.status < 400) dispatch({ type: types.FETCH_POSTS, payload: res.data });
};

export const fetchFriendRequests = () => async (dispatch, getState) => {
  const fetch = async () => await SocialServices.getFriendRequests(getState().login.accessToken);
  let res;
  try {
    res = await fetch();
  } catch ({ response }) {
    res = await actionErrorHandler(response, fetch, null, dispatch, getState);
  }
  if (res?.status < 400) dispatch({ type: types.FETCH_REQUESTS, payload: res.data });
};

export const fetchFriends = () => async (dispatch, getState) => {
  const fetch = async () => await SocialServices.getFriends(getState().login.accessToken);
  let res;
  try {
    res = await fetch();
  } catch ({ response }) {
    res = await actionErrorHandler(response, fetch, null, dispatch, getState);
  }
  if (res?.status < 400) dispatch({ type: types.FETCH_FRIENDS, payload: res.data });
};

export const selectLocation = (location) => async (dispatch) => {
  dispatch({ type: types.SELECTED_LOCATION, payload: location });
};

export const addPost = (post) => async (dispatch, getState) => {
  const sendPost = async () => await PostsService.addNewPost(getState().login.accessToken, post);
  let res;
  try {
    res = await sendPost();
  } catch ({ response }) {
    res = await actionErrorHandler(response, sendPost, null, dispatch, getState);
  }
  if (res?.status < 400)
    dispatch({
      type: types.ADD_POST,
      payload: { ...res.data.dataValues, photoURL: post.photo },
    });
};

export const sendFriendRequest = (userToAdd) => async (dispatch, getState) => {
  const sendRequest = async () =>
    await SocialServices.sendNewRequest(getState().login.accessToken, userToAdd);
  let res;
  try {
    res = await sendRequest();
  } catch ({ response }) {
    res = await actionErrorHandler(response, sendRequest, null, dispatch, getState);
  }
  if (res?.status < 400) {
    if (res.data === "request exists") alert("You already sent a request to this user");
    else alert("Sent successfully");
  }
};

export const addFriend = (username, friend) => async (dispatch, getState) => {
  const sendFriend = async () =>
    await SocialServices.addNewFriend(getState().login.accessToken, username, friend);
  let res;
  try {
    res = await sendFriend();
  } catch ({ response }) {
    res = await actionErrorHandler(response, sendFriend, null, dispatch, getState);
  }
  if (res?.status < 400)
    dispatch({
      type: types.ADD_FRIEND,
      payload: res.data,
    });
};

export const declineRequest = (username, declinedUsername) => async (dispatch, getState) => {
  const deleteRequest = async () =>
    await SocialServices.declineFriendRequest(
      getState().login.accessToken,
      username,
      declinedUsername
    );
  let res;
  try {
    res = await deleteRequest();
  } catch ({ response }) {
    res = await actionErrorHandler(response, deleteRequest, null, dispatch, getState);
  }
  if (res?.status < 400)
    dispatch({
      type: types.DECLINE_REQUEST,
      payload: res.data,
    });
};

export const login = (name, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_LOADING });
  try {
    const res = await loginService(name, password);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: types.LOGIN_ERROR });
  }
};

export const logout = () => async (dispatch, getState) => {
  await logoutService(getState().login.refreshToken);
  dispatch({ type: types.LOGOUT });
};

export const register = (user) => async (dispatch) => {
  dispatch({ type: types.REGISTER_LOADING });
  try {
    const res = await registerService(user);
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.REGISTER_ERROR, payload: error.response });
  }
};

export const getTagsByQuery = (query) => async (dispatch, getState) => {
  const fetchTags = async () => await getTagsByQueryService(query, getState().login.accessToken);
  let res;
  try {
    res = await fetchTags();
  } catch ({ response }) {
    if (response) res = await actionErrorHandler(response, fetchTags, null, dispatch, getState);
  }
  if (res?.status < 400) dispatch({ type: types.TAGS_CHANGE, payload: res.data });
};

export const addPhotoTag = (tag) => async (dispatch, getState) => {
  const addTag = async () => await addTagService(tag, getState().login.accessToken);
  let res;
  try {
    res = await addTag();
  } catch ({ response }) {
    if (response) res = await actionErrorHandler(response, addTag, null, dispatch, getState);
  }
  if (res?.status < 400) dispatch({ type: types.NEW_PHOTO_TAG, payload: tag });
};

export const getUsersByQuery = (query) => async (dispatch, getState) => {
  const getUsers = async () => await getUsersByQueryService(query, getState().login.accessToken);
  let res;
  try {
    res = await getUsers();
  } catch ({ response }) {
    if (response) res = await actionErrorHandler(response, getUsers, null, dispatch, getState);
  }
  if (res?.status < 400) dispatch({ type: types.USERS_CHANGE, payload: res.data });
};

export const getFilteredPosts = (fromDate, toDate, publishers, tags, groups, radius,location) => async (
  dispatch,
  getState
) => {
  dispatch({ type: types.FILTER_LOADING });
  const getPosts = async () =>
    await PostsService.getFilteredPosts(
      { fromDate, toDate, publishers, tags, groups, radius, location },
      getState().login.accessToken
    );
  let res;
  try {
    res = await getPosts();
  } catch ({ response }) {
    if (response) res = await actionErrorHandler(response, getPosts, null, dispatch, getState);
  }
  if (res?.status < 400) {
    dispatch({ type: types.FETCH_POSTS, payload: res.data });
    dispatch({ type: types.FILTER_SUCCESS });
  }
};

export const addLike = (postId) => async (dispatch, getState) => {
  const like = async () =>
    await PostsService.addLike(getState().login.userId, postId, getState().login.accessToken);
  let res;
  try {
    res = await like();
  } catch ({ response }) {
    if (response) res = await actionErrorHandler(response, like, null, dispatch, getState);
  }
  if (res?.status < 400)
    dispatch({ type: types.ADD_LIKE, payload: { userId: getState().login.userId, postId } });
};
