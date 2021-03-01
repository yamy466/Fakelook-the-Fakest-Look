const Sequelize = require("sequelize");
const PostModel = require("../Models/post");

const sequelize = new Sequelize("FakelookDB", "PotatoUser", "Potatoes", {
  host: "LAPTOP-G2BF8S5M/MYSERVER",
  dialect: "mssql",
});

const Post = PostModel(sequelize, Sequelize);

module.exports = {
  Post,
};
