const { Posts } = require("./config/dbconfig");
const { writeFile, readFile, readFileSync } = require("fs");
const tag = require("../Models/tag");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
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

  async getFilteredPosts({ fromDate, toDate, publishers, tags, groups, radius ,location }) {
    let where = {};
    if (fromDate && toDate)
      where.postedTime = { [Op.and]: { [Op.gte]: fromDate, [Op.lte]: toDate } };
    if (fromDate && !toDate) where.postedTime = { [Op.gte]: fromDate };
    if (toDate && !fromDate) where.postedTime = { [Op.lte]: toDate };
    if (publishers && publishers.length > 0) where.publisher = publishers;
    if (tags && tags.length > 0) where.tags = { [Op.overlap]: tags };
    // if(radius && location) where.location = sequelize.fn('ST_DWithin', sequelize.col('location'), sequelize.fn('ST_SetSRID', sequelize.fn('ST_MakePoint',  location.lat, location.lng), 4326), parseFloat(radius), false)

    return await Posts.findAll({ where });
  }

  async addLike(userId, postId) {
    const post = await Posts.findOne({
      where: {
        id: postId,
      },
    });
    post.likes = post.likes ? [...post.likes, userId] : [userId];
    post.save();
    return post;
  }
}

module.exports = new PostsRepository();
