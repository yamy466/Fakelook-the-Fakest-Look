const db = require("../DAL/postsRepository");
const usersRepository = require("../DAL/usersRepository");

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

  async getFilteredPosts(filters) {
    const posts = await db.getFilteredPosts(filters);
    return posts.map(p => {
      return { ...p.dataValues, photoURL: db.readPhoto(p.photoURL) };
    });
  }

  async addLike(userId, itemId, type) {
    return await db.addLike(userId, itemId, type);
  }

  async addComment(comment) {
    comment = await db.addComment(comment);
    const user = await usersRepository.getUserByUsernameOrId(null, comment.writer);
    comment.writer = user.username;
    return comment;
  }

  async getPostComments(postId) {
    let comments = await db.getPostComments(postId);
    comments = await Promise.all(
      comments.map(c =>
        usersRepository.getUserByUsernameOrId(null, c.writer).then(u => {
          c.writer = u.username;
          return c;
        })
      )
    );
    return comments;
  }
}

module.exports = new PostsController();
