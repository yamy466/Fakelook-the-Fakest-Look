const express = require("express");
const router = express.Router();
const controller = require("../controllers/social");
const asyncHandler = require("../helpers/asyncHandler");

// Get friend requests from db
router.get(
  "/getRequests",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.getFriendRequests(req.query.username);
      console.log(data, "at router");
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

module.exports = router;
