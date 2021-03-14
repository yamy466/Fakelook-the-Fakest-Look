const { Users } = require("./config/dbconfig");
const AuthRepository = require("./authRepository");

class SocialRepository {
  async getAllFriendRequests(username) {
    //returns an array of all the users who sent a friend request
    const user = await AuthRepository.getUserByUsername(username);
    return user.requests;
  }
}

module.exports = new SocialRepository();
