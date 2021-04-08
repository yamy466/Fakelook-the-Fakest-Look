const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const axios = require("axios").default
const {URLS} = require("../settings/URLS")

// Get posts from db
router.get(
  "/getPosts",
  asyncHandler(async (req, res) => {
    try {
      const response = await axios.get(`${URLS.postsURL}/getPosts`)
      res.send(response.data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/addPost",
  asyncHandler(async (req, res) => {
    try {
      const {post} = req.body;
      post.publisher = req.user.username;
      const response = await axios.post(`${URLS.postsURL}/addPost`,post);
      res.send(response.data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/like",
  asyncHandler(async (req, res) => {
    try {
      const {itemId,type} = req.body
      const response = await axios.post(`${URLS.postsURL}/like`,{userId: req.user.id, itemId, type});
      res.send(response.data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/comment",
  asyncHandler(async (req, res) => {
    try {
      let { comment } = req.body;
      comment.writer = req.user.id;
      let response = await axios.post(`${URLS.postsURL}/comment`,comment)
      comment = response.data
      response = await axios.get(`${URLS.usersURL}/getById/?id=${req.user.id}`)
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
      const response = await axios.post(`${URLS.postsURL}/filter`,req.body.filters);
      res.send(response.data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

module.exports = router;
