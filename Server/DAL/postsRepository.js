const { Posts } = require("./config/dbconfig");

class PostsRepository {
  async getAllPosts() {
    let result = Posts.findAll({});
    return result;
  }

  async createNewPost(post) {
    console.log(post, "this is the post to create");
  }
}

module.exports = new PostsRepository();
