const express = require("express");
const app = express();
const cors = require("cors");
const asyncHandler = require("./helpers/asyncHandler");
const postsRouter = require("./routers/postsRouter");
const socialRouter = require("./routers/socialRouter");
const authRouter = require("./routers/authRouter");
const tagsRouter = require("./routers/tagsRouter");
const usersRouter = require("./routers/usersRouter");
const {URLS,PORTS} = require("./settings/URLS");
const axios = require("axios").default;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.listen(PORTS.mainServerPort, () => {
  console.log(`Fakelook server is running at ${URLS.mainServerURL}`);
});

app.use(
  asyncHandler(async (req, res, next) => {
    if (!req.path.includes("/api/auth") && !req.body.test === true) {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) return res.sendStatus(403);
      axios
        .get(`${URLS.authURL}/validate/?token=${token}`)
        .then(res => {
          if (!res.data) return res.status(401);
          req.user = res.data;
          next();
        })
        .catch(err => res.status(401).send(err));
    } else next();
  })
);

app.use("/api/auth", authRouter);
app.use("/api/Social", socialRouter);
app.use("/api/posts", postsRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/users", usersRouter);
