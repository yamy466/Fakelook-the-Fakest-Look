const socialDB = require("../DAL/socialRepository");
const authDB = require("../DAL/authRepository");

class SocialController {
  // Get friend requests
  async getFriendRequests(username) {
    let requestsIds = await socialDB.getAllFriendRequests(username);
    let user = "";
    let users = [];
    for (let i = 0; i < requestsIds.length; i++) {
      user = await authDB.getUsernameByID(requestsIds[i]);
      users.push(user.username);
    }
    return users;
  }
}

module.exports = new SocialController();
