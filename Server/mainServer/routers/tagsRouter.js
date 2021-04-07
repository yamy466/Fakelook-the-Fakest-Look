const express = require("express");
const router = express.Router();
const controller = require("../controllers/tags");
const asyncHandler = require("../helpers/asyncHandler");

router.get("/search",asyncHandler(async (req,res) => {
    try {
        const tags = await controller.getTagsByQuery(req.query.query);
        res.send(tags.map(t => t.tag));
    } catch (error) {
        res.status(400).send(error)
    }
}))

router.post("/add",asyncHandler(async (req,res) => {
    try {
        const data = await controller.addTag(req.body.tag)
        res.send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}))

module.exports = router;