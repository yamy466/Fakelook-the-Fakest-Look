const { Users } = require("./config/dbconfig");
const { Op } = require("sequelize");

class UsersRepository {
  async getUsersByQuery(query) {
    return await Users.findAll({
      limit: 10,
      where: {
        username: {
          [Op.like]: `%${query}%`,
        },
      },
    });
  }

  async getUserIdByUsername(username) {
    let user = await Users.findOne({
      where: {
        username,
      },
    });
    return user.id;
  }
}

module.exports = new UsersRepository();
