import types from "../enviroments/actionTypes";
import PostsService from "../services/postsService";
import {
  login as loginService,
  refreshToken as refreshTokenService,
  logout as logoutService,
  register as registerService,
} from "../services/authService";
import actionErrorHandler from "../helpers/actionsErrorHandler";

export const fetchPosts = () => async (dispatch, getState) => {
  const fetch = async () =>
    await PostsService.getAllPosts(getState().login.accessToken);
  let res;
  try {
    res = await fetch();
  } catch ({ response }) {
    res = await actionErrorHandler(response, fetch, null, dispatch, getState);
  }
  if (res?.status < 400)
    dispatch({ type: types.FETCH_POSTS, payload: res.data });
};

export const selectLocation = (location) => async (dispatch) => {
  dispatch({ type: types.SELECTED_LOCATION, payload: location });
};

export const login = (name, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_LOADING });
  try {
    const res = await loginService(name, password);
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
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
    dispatch({ type: types.REGISTER_SUCCESS, payload: { ...res.data } });
  } catch (error) {
    dispatch({ type: types.REGISTER_ERROR, payload: error.response });
  }
  // res.status > 399
};
