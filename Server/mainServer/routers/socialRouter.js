const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const axios = require("axios").default;
const { URLS } = require("../settings/URLS");

// Get friend requests from db
router.get(
  "/getRequests",
  asyncHandler(async (req, res) => {
    try {
      const response = await axios.get(
        `${URLS.socialURL}/getRequests/?username=${req.user.username}`
      );
      res.send(response.data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.get(
  "/getFriends",
  asyncHandler(async (req, res) => {
    try {
      const response = await axios.get(
        `${URLS.socialURL}/getFriends/?username=${req.user.username}`
      );
      res.send(response.data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/addFriend",
  asyncHandler(async (req, res) => {
    try {
      const {friend} = req.body
      const response = await axios.post(`${URLS.socialURL}/addFriend`,{username: req.user.username,friend});
      res.send(response.data);
    } catch (err) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/declineRequest",
  asyncHandler(async (req, res) => {
    try {
      const {declinedUsername} = req.body 
      const response = await axios.post(`${URLS.socialURL}/declineRequest`,{username: req.user.username,declinedUsername});
      res.send(response.data);
    } catch (err) {
      res.status(400).send(error);
    }
  })
);

router.delete(
  "/deleteFriend",
  asyncHandler(async (req, res) => {
    try {
      const {deletedUser} = req.body;
      const response = await axios.delete(`${URLS.socialURL}/deleteFriend`,{data:{username: req.user.username,deletedUser}});
      res.send(response.data);
    } catch (err) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/createNewRequest",
  asyncHandler(async (req, res) => {
    try {
      const {userToAdd} = req.body;
      const response = await axios.post(`${URLS.socialURL}/createNewRequest`,{userToAdd,username: req.user.username});
      res.send(response.data);
    } catch (err) {
      res.status(400).send(error);
    }
  })
);

module.exports = router;
