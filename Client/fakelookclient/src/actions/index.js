import types from "../enviroments/actionTypes";
import PostsService from "../services/postsService";
import SocialServices from "../services/socialServices";
import {getUsersByQuery as getUsersByQueryService} from "../services/usersService"
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
  if (res.status < 400) dispatch({ type: types.FETCH_POSTS, payload: res.data });
};

<<<<<<< HEAD
export const fetchFriendRequests = () => async (dispatch, getState) => {
  const fetch = async () =>
    await SocialServices.getFriendRequests(
      getState().login.username,
      getState().login.accessToken
    );
  let res;
  try {
    res = await fetch();
    console.log(res.data, "actions");
  } catch ({ response }) {
    res = await actionErrorHandler(response, fetch, null, dispatch, getState);
  }
  if (res?.status < 400)
    dispatch({ type: types.FETCH_REQUESTS, payload: res.data });
};

export const selectLocation = (location) => async (dispatch) => {
=======
export const selectLocation = location => async dispatch => {
>>>>>>> 06d9559df5a2b062f49e18fb88a94493651a919a
  dispatch({ type: types.SELECTED_LOCATION, payload: location });
};

export const addPost = post => async (dispatch, getState) => {
  const sendPost = async () => await PostsService.addNewPost(getState().login.accessToken, post);
  let res;
  try {
    res = await sendPost();
  } catch ({ response }) {
    res = await actionErrorHandler(response, sendPost, null, dispatch, getState);
  }
  if (res.status < 400)
    dispatch({ type: types.ADD_POST, payload: { ...res.data.dataValues, photoURL: post.photo } });
};
export const addFriend = (friend) => async (dispatch, getState) => {
  const sendFriend = async () =>
    await SocialServices.addNewFriend(getState().login.accessToken, friend);
  let res;
  try {
    res = await sendFriend();
  } catch ({ response }) {
    res = await actionErrorHandler(
      response,
      sendFriend,
      null,
      dispatch,
      getState
    );
  }
  if (res?.status < 400)
    dispatch({
      type: types.ADD_FRIEND,
      payload: { ...res.data.dataValues },
    });
};

export const login = (name, password) => async dispatch => {
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

export const register = user => async dispatch => {
  dispatch({ type: types.REGISTER_LOADING });
  try {
    const res = await registerService(user);
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.REGISTER_ERROR, payload: error.response });
  }
  // res.status > 399
};

export const getTagsByQuery = query => async (dispatch, getState) => {
  const fetchTags = async () => await getTagsByQueryService(query, getState().login.accessToken);
  let res;
  try {
    res = await fetchTags();
  } catch ({ response }) {
    if (response) res = await actionErrorHandler(response, fetchTags, null, dispatch, getState);
  }
  if (res.status < 400) dispatch({ type: types.TAGS_CHANGE, payload: res.data });
};

export const addPhotoTag = tag => async (dispatch, getState) => {
  const addTag = async () => await addTagService(tag, getState().login.accessToken);
  let res;
  try {
    res = await addTag();
  } catch ({ response }) {
    if (response) res = await actionErrorHandler(response, addTag, null, dispatch, getState);
  }
  if (res?.status < 400) dispatch({ type: types.NEW_PHOTO_TAG, payload: tag });
};

export const getUsersByQuery = query => async (dispatch,getState) => {
  const getUsers = async () => await getUsersByQueryService(query,getState().login.accessToken);
  let res;
  try {
    res = await getUsers();
  } catch ({response}) {
    if(response) res = await actionErrorHandler(response,getUsers,null,dispatch,getState);
  }
  if(res?.status < 400) dispatch({type: types.USERS_CHANGE,payload: res.data})
}
