const db = require("../DAL/postsRepository");

class PostsController {
  // Get Posts
  getAllPosts() {
    return db.getAllPosts();
  }

  addPost(post) {
    return db.createNewPost(post);
  }
}

module.exports = new PostsController();
