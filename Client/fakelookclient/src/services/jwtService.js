import { getCookie, setCookie } from "./cookieService";

class JWTService {
  getAccessToken = () => this._accessToken;

  getRefreshToken = () => getCookie("refresh_token");

  setAccessToken = token => this._accessToken = token;

  setRefreshToken = token => setCookie("refresh_token", token);
}

export default new JWTService();
