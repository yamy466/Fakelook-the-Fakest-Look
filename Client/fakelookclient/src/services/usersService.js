import http from "./httpService";
const serverRoute = "/api/users/";

export const getUsersByQuery = async query =>
  await http.get(`${serverRoute}search/?query=${query}`);
