import http from "./httpService";

const serverRoute = "/api/Posts/";

const PostsService = {
  async getAllPosts() {
    return await http.get(serverRoute + "getPosts");
  },
};
export default PostsService;
