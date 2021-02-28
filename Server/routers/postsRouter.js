const express = require("express");
const router = express.Router();
const controller = require("../controllers/posts");
const asyncHandler = require("../helpers/asyncHandler");

// Get posts from db
router.get(
  "/getPosts",
  asyncHandler(async (req, res) => {
    const data = await controller.getAllPosts();
    res.send(data);
  })
);

module.exports = router;
