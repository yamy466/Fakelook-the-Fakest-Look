const express = require("express");
const router = express.Router();
const controller = require("../controllers/socialController");
const asyncHandler = require("../helpers/asyncHandler");

// Get friend requests from db
router.get(
  "/getRequests",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.getFriendRequests(req.query.username);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.get(
  "/getFriends",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.getFriends(req.query.username);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/addFriend",
  asyncHandler(async (req, res) => {
    try {
      const {username,friend} = req.body
      const data = await controller.addFriend(username, friend);
      res.send(data);
    } catch (err) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/declineRequest",
  asyncHandler(async (req, res) => {
    try {
      const {username,declinedUsername} = req.body
      const data = await controller.declineRequest(username, declinedUsername);
      res.send(data);
    } catch (err) {
      res.status(400).send(error);
    }
  })
);

router.delete(
  "/deleteFriend",
  asyncHandler(async (req, res) => {
    try {
      const {username,deletedUser} = req.body;
      const data = await controller.deleteFriend(username, deletedUser);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/createNewRequest",
  asyncHandler(async (req, res) => {
    try {
      const {userToAdd,username} = req.body;
      const data = await controller.createNewRequest(userToAdd, username);
      res.send(data);
    } catch (err) {
      res.status(400).send(error);
    }
  })
);

module.exports = router;
