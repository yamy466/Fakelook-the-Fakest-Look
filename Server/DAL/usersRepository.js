const { Users } = require("./config/dbconfig");
const { Op } = require("sequelize");

class UsersRepository {
  async getUsersByQuery(query, currentUsername) {
    let where = {
      username: {
        [Op.like]: `${query}%`,
      },
    };
    if (currentUsername) where.username[Op.not] = currentUsername;

    return await Users.findAll({
      limit: 10,
      where: where,
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

  async getUsernameByID(id) {
    let user = await Users.findOne({
      where: {
        id,
      },
    });
    return user.username;
  }
}

module.exports = new UsersRepository();
