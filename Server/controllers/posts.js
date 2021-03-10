const db = require("../DAL/postsRepository");

class PostsController {
  // Get Posts
  async getAllPosts() {
    return await db.getAllPosts();
  }

  addPost(post) {
    return db.createNewPost(post);
  }
}

module.exports = new PostsController();
