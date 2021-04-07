const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const asyncHandler = require("../helpers/asyncHandler");

router.get(
  "/search",
  asyncHandler(async (req, res) => {
    try {
      const { query, username } = req.query;
      const users = await controller.getUsersByQuery(query, username);
      res.send(users.map(u => u.username));
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.get(
  "/getByAuth",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.getUserByUsernameAndPassword(req.query);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.get(
  "/getByUsername",
  asyncHandler(async (req, res) => {
    try {
      const user = await controller.getUserByUsername(req.query.username);
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/getUsernamesByIds",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.getUsernamesByIds(req.body);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.get(
  "/getById",
  asyncHandler(async (req, res) => {
    try {
      const user = await controller.getUserById(req.query.id);
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/new",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.addNewUser(req.body.user);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

module.exports = router;
