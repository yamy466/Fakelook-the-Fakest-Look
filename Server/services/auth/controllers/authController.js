require("dotenv").config();
const authRepository = require("../dal/authRepository");
const jwt = require("jsonwebtoken");
const CustomError = require("../helpers/customError");

class AuthContoller {
  async register(user) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    await authRepository.addRefreshToken(refreshToken);
    return { accessToken, refreshToken, username: user.username, userId: user.id };
  }

  async login(user) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    await authRepository.addRefreshToken(refreshToken);
    return { accessToken, refreshToken, username: user.username , userId: user.id };
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
