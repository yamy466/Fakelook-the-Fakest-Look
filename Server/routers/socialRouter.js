const express = require("express");
const router = express.Router();
const controller = require("../controllers/social");
const asyncHandler = require("../helpers/asyncHandler");

// Get friend requests from db
router.get(
  "/getRequests",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.getFriendRequests(req.user.username);
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
      const data = await controller.getFriends(req.user.username);
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
      const data = await controller.addFriend(req.body.username, req.body.friend);
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
      const data = await controller.declineRequest(req.body.username, req.body.declinedUsername);
      res.send(data);
    } catch (err) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/createNewRequest",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.createNewRequest(req.body.userToAdd, req.user.username);
      res.send(data);
    } catch (err) {
      res.status(400).send(error);
    }
  })
);

module.exports = router;
