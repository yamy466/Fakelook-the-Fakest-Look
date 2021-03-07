const { User } = require("./config/dbconfig");
const bcrypt = require("bcrypt");

class AuthRepository {
  async register({ name, password, firstName, lastName, email }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      userName: name,
      password: hashedPassword,
      firstName,
      lastName,
      email,
    });
    return;
  }

  async login(userName, password) {
    let user = await User.findAll({
      where: {
        userName,
      },
    });
    user = user[0]
    if (user && (await bcrypt.compare(password, user.password)))
      return JSON.stringify(user);
    return null;
  }
}

module.exports = new AuthRepository();
