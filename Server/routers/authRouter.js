const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const asyncHandler = require("../helpers/asyncHandler");
const errorHandler = require("../helpers/errorHandler");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      const { name, password } = req.body;
      const data = await controller.login(name, password.toString());
      res.send(data);
    } catch (error) {
      res.status(401).send(error)
      // error = errorHandler(error);
      // res.status(error.status).send(error)
    }
  })
);

router.post(
  "/token",
  asyncHandler(async (req, res) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) res.sendStatus(401);
      const token = await controller.refreshToken(refreshToken);
      res.send(token);
    } catch (error) {
      res.status(400).send(error)
      // error = errorHandler(error);
      // res.status(error.status).send(error)
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.register({ ...req.body });
      res.send(data);
    } catch (error) {
      res.status(400).send(error)
    }
  })
);

router.delete(
  "/logout",
  asyncHandler(async (req,res) => {
    try {
      await controller.logout(req.body.token);
      res.sendStatus(204)
    } catch (error) {
      res.status(400).send(error)
      // error = errorHandler(error);
      // res.status(error.status).send(error)
    }
  })
)

module.exports = router;
