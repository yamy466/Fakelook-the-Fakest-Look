const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const axios = require("axios").default
const {URLS} = require("../settings/URLS")

router.get(
  "/search",
  asyncHandler(async (req, res) => {
    try {
      const {query,username} = req.query
      const response = await axios.get(`${URLS.usersURL}/search/?query=${query}&username=${username}`)
      // const users = await controller.getUsersByQuery(req.query.query, req.user.username);
      res.send(response.data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

module.exports = router;
