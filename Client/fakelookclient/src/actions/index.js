import types from "../enviroments/actionTypes";
import PostsService from "../services/postsService";
import {
  login as loginService,
  refreshToken as refreshTokenService,
  logout as logoutService,
  register as registerService,
} from "../services/authService";

export const fetchPosts = () => async (dispatch, getState) => {
  const fetch = async () =>
    await PostsService.getAllPosts(getState().login.accessToken);
  let res;
  try {
    res = await fetch();
  } catch ({ response }) {
    if (response.status === 403) {
      // const resToken = await refreshTokenService(getState().login.refreshToken);
      // if (resToken.status < 400) {
      //   dispatch({ type: types.REFRESH_TOKEN, payload: resToken.data });
      //   res = await fetch();
      // }
      try {
        res = await refreshToken(fetch, null, dispatch, getState);
      } catch (error) {
        console.log(error);
      }
    } else
      console.log("unknown error in fetchPosts status: " + response.status);
  }
  if (res?.status < 400)
    dispatch({ type: types.FETCH_POSTS, payload: res.data });
};

const refreshToken = async (fetchFunc, args = null, dispatch, getState) => {
  const resToken = await refreshTokenService(getState().login.refreshToken);
  if (resToken.status < 400) {
    dispatch({ type: types.REFRESH_TOKEN, payload: resToken.data });
    return (await args) ? fetchFunc(...args) : fetchFunc();
  }
  throw resToken;
};

export const selectLocation = (location) => async (dispatch) => {
  dispatch({ type: types.SELECTED_LOCATION, payload: location });
};

export const login = (name, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_LOADING });
  const res = await loginService(name, password);
  res.status > 399
    ? dispatch({ type: types.LOGIN_ERROR })
    : dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
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
    dispatch({ type: types.REGISTER_ERROR ,payload: error.response})
    
  }
  // res.status > 399
};
