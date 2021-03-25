import http from "./httpService";

const serverRoute = "/api/Posts/";

export const getAllPosts = async () => {
  return await http.get(serverRoute + "getPosts");
};

export const addNewPost = async post => {
  return await http.post(serverRoute + "addPost", {
    post: post,
  });
};

export const getFilteredPosts = async (filters = {}) => {
  return await http.post(`${serverRoute}filter`, {
    ...filters,
  });
};

export const addLike = async (userId, postId) => {
  return await http.post(`${serverRoute}like`, {
    userId,
    postId,
  });
};
