const express = require("express");
const router = express.Router();
const controller = require("../controllers/posts");
const asyncHandler = require("../helpers/asyncHandler");
const axios = require("axios").default
const {URLS} = require("../settings/URLS")

// Get posts from db
router.get(
  "/getPosts",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.getAllPosts();
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
      req.body.post.publisher = req.user.username;
      const data = await controller.addPost(req.body.post);
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
      const data = await controller.addLike(req.user.id, req.body.itemId, req.body.type);
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
      const { comment } = req.body;
      comment.writer = req.user.id;
      comment = await axios.post(`${URLS.postsURL}/comment`,comment)
      const response = await axios.get(`${URLS.usersURL}/getById/?id=${req.user.id}`)
      comment.writer = response.data.username;
      res.send(comment);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.get(
  "/comments",
  asyncHandler(async (req, res) => {
    try {
      let response = await axios.get(`${URLS.postsURL}/comments/?postId=${req.query.postId}`);
      const comments = response.data;
      response = await axios.post(`${URLS.usersURL}/getUsernamesByIds`,comments.map(c => c.writer))
      comments.map(c => c.writer = response.data.find(u => u.id === c.writer).username)
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
      const posts = await controller.getFilteredPosts(req.body.filters || {});
      res.send(posts);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

module.exports = router;
