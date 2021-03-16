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
    return await http.post(
      serverRoute + "addPost",
      {
        post: post,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  async getFilteredPosts(filters, token) {
    return await http.post(
      `${serverRoute}filter`,
      {
        ...filters,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  async addLike(userId, postId, token) {
    return await http.post(
      `${serverRoute}like`,
      {
        userId,
        postId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
};

export default PostsService;
