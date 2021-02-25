const express = require("express");
const router = express.Router();

router.get("/init",(req,res) => {
    res.send("Hi from posts service")
})



module.exports = router;