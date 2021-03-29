require("dotenv").config();
const usersRepository = require("../DAL/usersRepository");
const authRepository = require("../DAL/authRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomError = require("../helpers/customError");

class AuthContoller {
  async register(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    user = await usersRepository.addUser(user);
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    await authRepository.addRefreshToken(refreshToken);
    return { accessToken, refreshToken, username: user.username, userId: user.id };
  }

  async login(name, password) {
    const user = await usersRepository.getUserByUsernameOrId(name);
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw "incorrect username or password";

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    await authRepository.addRefreshToken(refreshToken);
    return { accessToken, refreshToken, username: name, userId: user.id };
  }

  async refreshToken(refreshToken) {
    const expiredRefreshTokenError = new CustomError(
      "expiredRefreshToken",
      401,
      "the given refresh token dosn't exist"
    );
    let token = await authRepository.checkRefreshToken(refreshToken);
    if (!token) throw expiredRefreshTokenError;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, res) => {
      if (err) throw expiredRefreshTokenError;
      token = this.generateAccessToken(res);
    });
    return token;
  }

  async logout(token) {
    await authRepository.deleteToken(token);
  }

  generateAccessToken = ({ username, id }) =>
    jwt.sign({ username, id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });

  generateRefreshToken = ({ username, id }) =>
    jwt.sign({ username, id }, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = new AuthContoller();
