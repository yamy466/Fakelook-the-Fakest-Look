const { Users } = require("./config/dbconfig");
const AuthRepository = require("./authRepository");
const UsersRepository = require("./usersRepository");

class SocialRepository {
  async getAllFriendRequests(username) {
    //returns an array of all the users who sent a friend request
    let user = await AuthRepository.getUserByUsername(username);
    if (user.requests === null) return 0;
    else return user.requests;
  }

  async addFriend(user, friendUser) {
    //updates the users as eachother friends and then removes the sent request from the friend
    await this.pushNewFriend(user, friendUser);
    await this.pushNewFriend(friendUser, user);
    return [user.id];
  }

  async pushNewFriend(user, friend) {
    let currentFriends = [];
    if (user.friends !== null) currentFriends = user.friends;
    currentFriends.push(friend.id);
    await Users.update({ friends: currentFriends }, { where: { username: user.username } });
  }

  async deleteRequest(user, userId) {
    let newRequests = user.requests;
    for (let i = 0; i < newRequests.length; i++) {
      if (newRequests[i] === userId) {
        newRequests.splice(i, 1);
        break;
      }
    }
    await Users.update({ requests: newRequests }, { where: { id: user.id } });
    return [user.id];
  }

  async deleteFriend(user, userId) {
    let currrentFriends = user.friends;
    for (let i = 0; i < currrentFriends.length; i++) {
      if (currrentFriends[i] === userId) {
        currrentFriends.splice(i, 1);
        break;
      }
    }
    await Users.update({ friends: currrentFriends }, { where: { id: user.id } });
    return [user.id];
  }

  async createNewRequest(userToAdd, currentUsername) {
    let addedUser = await AuthRepository.getUserByUsername(userToAdd);
    let currentUserID = await UsersRepository.getUserIdByUsername(currentUsername);
    let reqs = addedUser.requests;
    if (reqs === null) reqs = [];
    else if (
      this.isRequestExists(addedUser, currentUserID) ||
      this.isFriend(addedUser, currentUserID)
    )
      return "request exists";
    reqs.push(currentUserID);
    await Users.update({ requests: reqs }, { where: { id: addedUser.id } });
  }

  isRequestExists = (user, requestingUserID) => {
    let isExist = false;
    for (let i = 0; i < user.requests.length; i++) {
      let req = user.requests[i];
      if (req === requestingUserID) {
        isExist = true;
        break;
      }
    }
    return isExist;
  };

  isFriend = (addedUser, currentUserID) => {
    let isExist = false;
    for (let i = 0; i < addedUser.friends.length; i++) {
      let friend = addedUser.friends[i];
      if (friend === currentUserID) {
        isExist = true;
        break;
      }
    }
    return isExist;
  };
}

module.exports = new SocialRepository();
