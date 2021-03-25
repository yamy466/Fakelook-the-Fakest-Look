import http from "./httpService";
import jwtService from "./jwtService";

const serviceRoute = "/api/auth";

const login = async (name, password) => {
  const res = await http.post(`${serviceRoute}/login`, { name, password });
  jwtService.setAccessToken(res.data.accessToken);
  jwtService.setRefreshToken(res.data.refreshToken);
  return res;
};

const register = async user => {
  const res = await http.post(`${serviceRoute}/register`, user);
  jwtService.setAccessToken(res.data.accessToken);
  jwtService.setRefreshToken(res.data.refreshToken);
  return res;
};

const logout = async () =>{
  await http.delete(`${serviceRoute}/logout`, { data:{ token: jwtService.getRefreshToken() }});
  jwtService.setAccessToken("");
  jwtService.setRefreshToken(""); 
}

const refreshToken = async () =>
  await http.post(`${serviceRoute}/token`, { refreshToken: jwtService.getRefreshToken() });

export { login, register, refreshToken, logout };
