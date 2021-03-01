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

router.post(
  "/addPost",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.addPost(req.body);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  })
);

module.exports = router;
