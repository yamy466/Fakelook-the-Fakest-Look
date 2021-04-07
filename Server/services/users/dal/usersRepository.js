const { Users } = require("./config/dbconfig");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt")

class UsersRepository {
  async getUsersByQuery(query, currentUsername = null, friendId = null) {
    let where = {
      username: {
        [Op.like]: `${query}%`,
      },
    };
    if (currentUsername) where.username[Op.not] = currentUsername;
    if (friendId) where.friends[Op.contains] = [friendId];
    return await Users.findAll({
      limit: 10,
      where: where,
    });
  }

  async addUser(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return await Users.create({ ...user });
  }

  async getUserByUsernameOrId(username = null, id = null) {
    if (!username && !id) throw "no id or username given in getUserByUsernameOrId method";
    let where = {};
    if (username) where.username = username;
    else if (id) where.id = id;
    return await Users.findOne({ where });
  }
}

module.exports = new UsersRepository();
