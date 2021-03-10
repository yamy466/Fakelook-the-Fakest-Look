import http from "./httpService";


const serverRoute = "/api/Posts/";

const PostsService = {
  async getAllPosts(token) {
    return await http.get(serverRoute + "getPosts",{
      headers: {
       Authorization: "Bearer " + token}
    });
  },
};

export default PostsService;
