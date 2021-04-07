const db = require("../DAL/usersRepository");
const bcrypt = require("bcrypt");

class UsersController {
  async getUsersByQuery(query, currentUsername) {
    return await db.getUsersByQuery(query, currentUsername);
  }

  async getUserByUsernameAndPassword({ name, password }) {
    const user = await db.getUserByUsernameOrId(name);
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw "incorrect username or password";
    return user;
  }

  async addNewUser(user) {
    return await db.addUser(user);
  }

  async getUserByUsername(username) {
    return await db.getUserByUsernameOrId(username);
  }

  async getUserById(id) {
    return await db.getUserByUsernameOrId(null, id);
  }

  async getUsernamesByIds(ids) {
    const usernames = [];
    let user;
    await Promise.all(
      ids.map(id =>
        db
          .getUserByUsernameOrId(null, id)
          .then(user => usernames.push({ id, username: user.username }))
      )
    );
    return usernames;
  }
}

module.exports = new UsersController();
