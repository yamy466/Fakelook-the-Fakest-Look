const { Tokens } = require("./config/dbconfig");

class AuthRepository {

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
