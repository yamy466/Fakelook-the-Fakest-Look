const express = require("express");
const app = express();
const cors = require("cors");
const postsRouter = require("./routers/postsRouter");
const URLS = require("./settings/URLS");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

app.listen(URLS.serverPort, () => {
  console.log(
    `Fakelook server is running at ${URLS.serverDomain}:${URLS.serverPort}`
  );
});

app.use("/api/Posts", postsRouter);
