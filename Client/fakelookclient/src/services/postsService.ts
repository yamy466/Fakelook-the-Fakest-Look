import http from "./httpService";

const serverRoute = "/api/Posts/";

const PostsService = {
  async getAllPosts() {
    return await http.get(serverRoute + "getPosts");
  },
  async addNewPost(post: any) {
    return await http.get(serverRoute + "addPost", post);
  },
};

export default PostsService;
