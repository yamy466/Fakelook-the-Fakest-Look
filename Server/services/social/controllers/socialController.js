const socialDB = require("../dal/socialRepository");

class SocialController {
  // Get friend requests
  async getFriendRequests(username) {
    let requests = await socialDB.getAllFriendRequests(username);
    return await this.getIdArrayAsUsernames(requests);
  }

  async getFriends(username) {
    let friends = await socialDB.getAllFriends(username);
    return await this.getIdArrayAsUsernames(friends);
  }

  async getIdArrayAsUsernames(requests = []) {
    let user = {};
    let users = [];
    for (let i = 0; i < requests.length; i++) {
      user = await socialDB.getUserByUsernameOrId(null, requests[i]);
      users.push(user.username);
    }
    return users;
  }

  async addFriend(username, friendUsername) {
    let user = await socialDB.getUserByUsernameOrId(username);
    let friendUser = await socialDB.getUserByUsernameOrId(friendUsername);
    try {
      await socialDB.addFriend(user, friendUser);
      await socialDB.deleteRequest(user, friendUser.id);
      return await this.getIdArrayAsUsernames(user.requests);
    } catch (error) {
      return error;
    }
  }

  async declineRequest(username, declinedUsername) {
    let user = await socialDB.getUserByUsernameOrId(username);
    let declinedUser = await socialDB.getUserByUsernameOrId(declinedUsername);
    await socialDB.deleteRequest(user, declinedUser.id);
    return await this.getIdArrayAsUsernames(user.requests);
  }

  async deleteFriend(username, deletedUsername) {
    let user = await socialDB.getUserByUsernameOrId(username);
    let deletedUser = await socialDB.getUserByUsernameOrId(deletedUsername);
    await socialDB.removeFriend(user, deletedUser);
    return this.getIdArrayAsUsernames(user.friends);
  }

  async createNewRequest(userToAdd, currentUsername) {
    return await socialDB.createNewRequest(userToAdd, currentUsername);
  }
}

module.exports = new SocialController();
