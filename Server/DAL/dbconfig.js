const sequelize = require("sequelize");
const PostModel = require("../Models/post");

const connection = new sequelize("FakelookDB", "postgres", "potato", {
  dialect: "postgres",
});

const Post = PostModel(connection, sequelize);

module.exports = {
  Post,
};
