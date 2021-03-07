const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const asyncHandler = require("../helpers/asyncHandler");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
        const {name,password} = req.body;
        const data = await controller.login(name,password.toString())
        res.send(data);
    } catch (error) {
        res.status(400).send(error)
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.register({...req.body});
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

module.exports = router;
