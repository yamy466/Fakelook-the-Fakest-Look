const { Posts } = require("./config/dbconfig");
const { writeFile, readFile, readFileSync } = require("fs");
const tag = require("../Models/tag");
const photosDirectory = "./DAL/photos";
class PostsRepository {
  async getAllPosts() {
    const result = await Posts.findAll({});
    return result;
  }

  readPhoto(url) {
    let res;
    res = readFileSync(`${photosDirectory}/${url}.png`, { encodeURI: "BASE64" }, (err, data) => {
      if (err) throw err;
    });
    return `data:image/png;base64,${res.toString("base64")}`;
  }

  async createNewPost({ publisher, tags, taggedFriends, location, text, photo }) {
    const createdPost = await Posts.create({
      publisher: publisher,
      postedTime: new Date(),
      tags,
      taggedUsers: taggedFriends,
      location: `(${location.lat},${location.lng})`,
      photoURL: -1,
      text: text,
    });
    createdPost.photoURL = createdPost.id;
    await createdPost.save();
    const data = photo.replace(/^data:image\/\w+;base64,/, "");
    const buf = new Buffer.from(data, "base64");
    writeFile(`${photosDirectory}/${createdPost.photoURL}.png`, buf, err => {
      if (err) throw err;
    });
    return { ...createdPost };
  }

  async getFilteredPosts({ fromDate, toDate, publishers, tags, groups, radius }) {
    let posts = await Posts.findAll({});
    if (fromDate && toDate)
      posts = posts.filter(p => p.postedTime >= fromDate && p.postedTime <= toDate);
    if (fromDate && !toDate) posts = posts.filter(p => p.postedTime >= fromDate);
    if (toDate && !fromDate) posts = posts.filter(p => p.postedTime <= toDate);
    if (publishers && publishers.length > 0)
      posts = posts.filter(p => publishers.includes(p.publisher));
    if (tags && tags.length > 0) posts = posts.filter(p => p.tags.some(t => tags.includes(t)));
    //groups and radius filter here
    return posts;
  }

  async addLike(userId,postId){
    const post = await Posts.findOne({
      where: {
        id: postId
      }
    })
    post.likes = post.likes ? [...post.likes,userId] : [userId]
    post.save();
    return post;
  }
}

module.exports = new PostsRepository();
