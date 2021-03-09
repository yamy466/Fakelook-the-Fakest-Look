import http from "./httpService";

const serviceRoute = "/api/auth";

const login = async (name, password) => {
  return await http.post(`${serviceRoute}/login`, { name, password });
};

const register = async (user) => {
  //add to redux and add errors handlers!!
  return await http.post(`${serviceRoute}/register`, user);
};

const logout = async (token) => {
  return await http.delete(`${serviceRoute}/logout`, { data: { token } });
  //add in server (delete token of ) and full implementation in the redux!
};

const refreshToken = async (refreshToken) => {
  return await http.post(`${serviceRoute}/token`, { refreshToken });
};

export { login, register, refreshToken, logout };
