const sql = require("mssql");
const config = require("./dbconfig");

class PostsRepository {
  async getAllPosts() {
    try {
      let data = await sql.connect(config);
      let posts = await data.request().query("SELECT * from Posts");
      return posts.recordsets;
    } catch (error) {
      console.log(error);
    }
  }

  async createNewPost(post) {
    console.log(post, "this is the post to create");
  }
}

module.exports = new PostsRepository();
