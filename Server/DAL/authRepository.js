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
    const user = await User.findAll({
      where: {
        userName,
      },
    });
    if (user.length > 0 && (await bcrypt.compare(password, user[0].password)))
      return JSON.stringify(user[0]);
    return "Denied!!";
  }
}

module.exports = new AuthRepository();
