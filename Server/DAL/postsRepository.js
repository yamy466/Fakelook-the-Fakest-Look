const { Post } = require("./config/dbconfig");

class PostsRepository {
  async getAllPosts() {
    var result = Post.findAll({});
    return result;
  }

  async createNewPost(post) {
    console.log(post, "this is the post to create");
  }
}

module.exports = new PostsRepository();
