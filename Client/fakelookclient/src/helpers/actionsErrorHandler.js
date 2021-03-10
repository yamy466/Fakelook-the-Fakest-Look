import types from "../enviroments/actionTypes";
import { refreshToken as refreshTokenService } from "../services/authService";

//NOT for auth actions!
const actionErrorHandler = async (response, fetchFunc, args = null, dispatch, getState) => {
  if (response.status === 403) {
    try {
      return await refreshToken(fetchFunc, args, dispatch, getState);
    } catch (error) {
      console.log(error);
    }
  } else console.log("unknown error in ACTION status: " + response.status);
};

const refreshToken = async (fetchFunc, args = null, dispatch, getState) => {
  const resToken = await refreshTokenService(getState().login.refreshToken);
  if (resToken.status < 400) {
    dispatch({ type: types.REFRESH_TOKEN, payload: resToken.data });
    return args ? await fetchFunc(...args) : await fetchFunc();
  }
  throw resToken;
};

export default actionErrorHandler;
