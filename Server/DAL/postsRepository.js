const { Posts } = require("./config/dbconfig");

class PostsRepository {
  async getAllPosts() {
    const result = await Posts.findAll({});
    return result;
  }

  async createNewPost(post) {
    console.log(post, "this is the post to create");
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
