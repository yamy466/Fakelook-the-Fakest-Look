const { Users, Tokens } = require("./config/dbconfig");

class AuthRepository {
  async addUser(user) {
    return await Users.create({ ...user });
  }

  async getUserByUsername(username) {
    let user = await Users.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  async getUsernameByID(userId) {
    //gets an array of id's and returns the usernames of the users as an array
    let user = await Users.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async deleteToken(token) {
    await Tokens.destroy({
      where: {
        token: token,
      },
      force: true,
    });
  }

  async addRefreshToken(token) {
    return await Tokens.create({ token });
  }

  async checkRefreshToken(token) {
    return await Tokens.findOne({ where: { token } });
  }
}

module.exports = new AuthRepository();
