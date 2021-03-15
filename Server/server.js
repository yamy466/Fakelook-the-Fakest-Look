require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const postsRouter = require("./routers/postsRouter");
const socialRouter = require("./routers/socialRouter");
const authRouter = require("./routers/authRouter");
const tagsRouter = require("./routers/tagsRouter");
const usersRouter = require("./routers/usersRouter")
const URLS = require("./settings/URLS");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.listen(URLS.serverPort, () => {
  console.log(`Fakelook server is running at ${URLS.serverDomain}:${URLS.serverPort}`);
});

app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send(err);
      if(!err){
        req.user = user;
        next();
      }
    });
});

app.use("/api/Social", socialRouter);
app.use("/api/posts", postsRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/users", usersRouter);
