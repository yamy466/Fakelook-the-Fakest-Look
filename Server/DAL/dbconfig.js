const Sequelize = require("sequelize");
const PostModel = require("../Models/post");

const sequelize = new Sequelize("FakelookDB", "postgres", "potato", {
  dialect: "postgres",
});

const Post = PostModel(sequelize, Sequelize);

module.exports = {
  Post,
};
