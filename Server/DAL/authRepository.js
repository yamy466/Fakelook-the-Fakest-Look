const { User } = require("./config/dbconfig");
const bcrypt = require("bcrypt");

class AuthRepository {
  async register({ username, password, firstName, lastName, email }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
    });
    return user;
  }

  async login(username, password) {
    let user = await User.findAll({
      where: {
        username,
      },
    });
    user = user[0]
    if (user && (await bcrypt.compare(password, user.password)))
      return JSON.stringify(user);
    return null;
  }
}

module.exports = new AuthRepository();
