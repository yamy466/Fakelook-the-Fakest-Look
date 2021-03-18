const db = require("../DAL/usersRepository");

class UsersController {
  async getUsersByQuery(query, currentUsername) {
    return await db.getUsersByQuery(query, currentUsername);
  }
}

module.exports = new UsersController();
