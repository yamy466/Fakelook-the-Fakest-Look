const db = require("../DAL/postsRepository");

class PostsController {
  // Get Posts
  getAllPosts() {
    return db.getAllPosts();
  }
}

module.exports = new PostsController();
