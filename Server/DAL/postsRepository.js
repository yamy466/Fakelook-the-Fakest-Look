class PostsRepository {
  async getAllPosts() {
    const data = getData();
    return data;
  }
}

module.exports = new PostsRepository();

function getData() {
  const data = [{ name: "potato" }, { name: "potato2" }, { name: "potato3" }];
  return data;
}
