import {
  login as loginService,
  logout as logoutService,
  register as registerService,
} from "../services/authService";
import types from "../enviroments/actionTypes";

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
    console.error(error);
  }
};

export const logout = () => async dispatch => {
  await logoutService();
  dispatch({ type: types.LOGOUT });
};

export const register = user => async dispatch => {
  dispatch({ type: types.REGISTER_LOADING });
  try {
    const res = await registerService(user);
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.REGISTER_ERROR, payload: error.response });
    console.error(error);
  }
};
