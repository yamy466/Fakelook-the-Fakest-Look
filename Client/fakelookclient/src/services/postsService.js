import http from "./httpService";

const serverRoute = "/api/Posts/";

const PostsService = {
  async getAllPosts(token) {
    return await http.get(serverRoute + "getPosts", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  async addNewPost(token, post) {
    return await http.get(serverRoute + "addPost", {
      headers: {
        Authorization: "Bearer " + token,
      },
      post: post,
    });
  },
};

export default PostsService;
