import http from "./httpService";
const serverRoute = "/api/tags/";

export const getTagsByQuery = async query => await http.get(`${serverRoute}search/?query=${query}`);

export const addTag = async tag => await http.post(`${serverRoute}add`, { tag });
