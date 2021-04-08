const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const axios = require("axios").default
const {URLS} = require("../settings/URLS")

router.get("/search",asyncHandler(async (req,res) => {
    try {
        const response = await axios.get(`${URLS.postsURL}/searchTags/?query=${req.query.query}`);
        res.send(response.data);
    } catch (error) {
        res.status(400).send(error)
    }
}))

router.post("/add",asyncHandler(async (req,res) => {
    try {
        const response = await axios.post(`${URLS.postsURL}/addTag`,{tag: req.body.tag})
        res.send(response.data)
    } catch (error) {
        res.status(400).send(error)
    }
}))

module.exports = router;