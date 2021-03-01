class PostsRepository {
  async getAllPosts() {
    const data = getData();
    return data;
  }

  async createNewPost(post) {
    console.log(post, "this is the post to create");
  }
}

module.exports = new PostsRepository();

function getData() {
  const data = [{ name: "potato" }, { name: "potato2" }, { name: "potato3" }];
  return data;
}
