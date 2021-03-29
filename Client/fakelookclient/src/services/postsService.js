import http from "./httpService";

const serverRoute = "/api/Posts/";

export const getAllPosts = async () => await http.get(serverRoute + "getPosts");

export const addNewPost = async post => await http.post(serverRoute + "addPost", { post });

export const getFilteredPosts = async (filters = {}) =>
  await http.post(`${serverRoute}filter`, { ...filters });

export const addLike = async (itemId, type) =>
  await http.post(`${serverRoute}like`, { itemId, type });

export const addComment = async comment => await http.post(`${serverRoute}comment`, { comment });

export const getPostComments = async postId =>
  await http.get(`${serverRoute}comments/?postId=${postId}`);
