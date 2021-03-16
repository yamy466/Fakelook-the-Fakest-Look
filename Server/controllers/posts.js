const db = require("../DAL/postsRepository");

class PostsController {
  // Get Posts
  async getAllPosts() {
    const posts = await db.getAllPosts();
    return posts.map(p => {
      return { ...p.dataValues, photoURL: db.readPhoto(p.photoURL) };
    });
  }

  async addPost(post) {
    return db.createNewPost(post);
  }

  async getFilteredPosts(filters){
    const posts = await db.getFilteredPosts(filters)
    return posts.map(p => {
      return { ...p.dataValues, photoURL: db.readPhoto(p.photoURL) };
    });
  }

  async addLike(userId,postId){
    return await db.addLike(userId,postId);
  }
}

module.exports = new PostsController();
