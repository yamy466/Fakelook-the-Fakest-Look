const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const tagsConroller = require("../controllers/tagsController");
const asyncHandler = require("../helpers/asyncHandler");

router.get(
  "/getPosts",
  asyncHandler(async (req, res) => {
    try {
      const data = await postsController.getAllPosts();
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/addPost",
  asyncHandler(async (req, res) => {
    try {
      const data = await postsController.addPost(req.body);
      res.send(data);
    } catch (err) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/like",
  asyncHandler(async (req, res) => {
    try {
      const data = await postsController.addLike(req.body);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/comment",
  asyncHandler(async (req, res) => {
    try {
      const comment = req.body;
      const data = await postsController.addComment(comment);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.get(
  "/comments",
  asyncHandler(async (req, res) => {
    try {
      const comments = await postsController.getPostComments(req.query.postId);
      res.send(comments);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/filter",
  asyncHandler(async (req, res) => {
    try {
      const posts = await postsController.getFilteredPosts(req.body || {});
      res.send(posts);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.get("/searchTags",asyncHandler(async (req,res) => {
    try {
        const tags = await tagsConroller.getTagsByQuery(req.query.query);
        res.send(tags.map(t => t.tag));
    } catch (error) {
        res.status(400).send(error)
    }
}))

router.post("/addTag",asyncHandler(async (req,res) => {
    try {
        const data = await tagsConroller.addTag(req.body.tag)
        res.send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}))

module.exports = router;
