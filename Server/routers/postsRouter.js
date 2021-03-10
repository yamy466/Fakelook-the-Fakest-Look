const express = require("express");
const router = express.Router();
const controller = require("../controllers/posts");
const asyncHandler = require("../helpers/asyncHandler");

// Get posts from db
router.get(
  "/getPosts",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.getAllPosts();
      res.send(data);
    } catch (error) {
      res.send(errorHandler(error));
    }
  })
);

router.post(
  "/addPost",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.addPost(req.body);
      res.send(data);
    } catch (err) {
      res.send(errorHandler(error));
    }
  })
);

module.exports = router;
