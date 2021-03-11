const db = require("../DAL/postsRepository");

class PostsController {
  // Get Posts
  async getAllPosts() {
    let posts = await db.getAllPosts();
    posts = posts.map(p => {
      return { ...p.dataValues, photoURL: `data:image/png;base64,${db.readPhoto(p.photoURL).toString("base64")}` };
    });
    return posts;
  }

  async addPost(post) {
    return db.createNewPost(post);
  }
}

module.exports = new PostsController();
