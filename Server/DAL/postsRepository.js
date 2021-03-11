const { Posts } = require("./config/dbconfig");

class PostsRepository {
  async getAllPosts() {
    const result = await Posts.findAll({});
    return result;
  }

  async createNewPost(post) {
    await Posts.create({ ...post });
  }

  // async getPostsByRadius(origin,radius){
  //   const res = Posts.findAll({
  //     where: {
  //       location: {

  //       }
  //     }
  //   })
  // }
}

module.exports = new PostsRepository();
