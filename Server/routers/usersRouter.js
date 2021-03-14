const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const asyncHandler = require("../helpers/asyncHandler");

router.get(
  "/search",
  asyncHandler(async (req, res) => {
    try {
        const users = await controller.getUsersByQuery(req.query.query);
        res.send(users.map(u => u.username))
    } catch (error) {
        res.status(400).send(error);
    }
  })
);

module.exports = router;