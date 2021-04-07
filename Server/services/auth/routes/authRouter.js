const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const asyncHandler = require("../helpers/asyncHandler");
const jwt = require("jsonwebtoken");

router.get(
  "/validate",
  asyncHandler(async (req, res) => {
    try {
      const { token } = req.query;
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw err;
        res.send(user);
      });
    } catch (error) {
      res.status(401).send(error);
    }
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      const { user } = req.body;
      const data = await controller.login(user);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/token",
  asyncHandler(async (req, res) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) res.sendStatus(403);
      const token = await controller.refreshToken(refreshToken);
      res.status(201).send(token);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.register(req.body.user);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.delete(
  "/logout",
  asyncHandler(async (req, res) => {
    try {
      await controller.logout(req.body.token);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

module.exports = router;
