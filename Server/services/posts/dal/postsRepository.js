const { Posts, Comments } = require("./config/dbconfig");
const { writeFile, readFileSync } = require("fs");
const tag = require("../Models/tag");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const geo = require("geolib");
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

  async getFilteredPosts({
    fromDate = null,
    toDate = null,
    publishers = null,
    tags = null,
    group = null,
    radius = null,
    location = null,
  }) {
    let where = {};
    if (fromDate && toDate)
      where.postedTime = { [Op.and]: { [Op.gte]: fromDate, [Op.lte]: toDate } };
    if (fromDate && !toDate) where.postedTime = { [Op.gte]: fromDate };
    if (toDate && !fromDate) where.postedTime = { [Op.lte]: toDate };
    if (publishers && publishers.length > 0) where.publisher = publishers;
    if (tags && tags.length > 0) where.tags = { [Op.overlap]: tags };
    let posts = await Posts.findAll({ where });
    if (radius && location) {
      radius = parseInt(radius) * 1000;
      posts = posts.filter(p => {
        return (
          geo.getDistance(
            { lat: location.lat, lon: location.lng },
            { lat: p.location.x, lon: p.location.y }
          ) <= radius
        );
      });
    }
    return posts;
    // if(radius && location) where.location = sequelize.fn('ST_DWithin', sequelize.col('location'), sequelize.fn('ST_SetSRID', sequelize.fn('ST_MakePoint',  location.lat, location.lng), 4326), parseFloat(radius), false)
  }

  async addLike(userId, itemId, type) {
    let item;
    if (type === "post") {
      if (await this.isLikedAlready(userId, itemId)) throw "likes already";
      item = await Posts.findOne({ where: { id: itemId } });
    } else {
      if (await this.isLikedAlready(userId, itemId)) throw "likes already";
      item = await Comments.findOne({ where: { id: parseInt(itemId) } });
    }

    item.likes = item.likes ? [...item.likes, userId] : [userId];
    item.save();
    return item;
  }

  async isLikedAlready(userId, itemId) {
    const res = await Comments.findOne({
      where: { id: itemId, likes: { [Op.contains]: [userId] } },
    });
    return res ? true : false;
  }

  async addComment({ text, writer, postId }) {
    return await Comments.create({
      text,
      writer,
      createdAt: new Date(),
      postId,
    });
  }

  async getPostComments(postId) {
    return await Comments.findAll({ where: { postId } });
  }
}

module.exports = new PostsRepository();
