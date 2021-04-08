const express = require("express");
const router = express.Router();
const { URLS } = require("../settings/URLS");
const asyncHandler = require("../helpers/asyncHandler");
const axios = require("axios").default;

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      const { name, password } = req.body;
      let response = await axios.get(
        `${URLS.usersURL}/getByAuth/?name=${name}&password=${password}`
      );
      response = await axios.post(`${URLS.authURL}/login`, {user: response.data});
      res.send(response.data);
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
      const response = await axios.post(`${URLS.authURL}/token`, { refreshToken });
      res.status(201).send(response.data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      let response = await axios.post(`${URLS.usersURL}/new`, { user: req.body });
      response = await axios.post(`${URLS.authURL}/register`, { user: response.data });
      res.send(response.data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.delete(
  "/logout",
  asyncHandler(async (req, res) => {
    try {
      await axios.delete(`${URLS.authURL}/logout`, { data: {token: req.body.token} });
      res.sendStatus(204);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

module.exports = router;
