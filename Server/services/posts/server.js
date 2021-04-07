const express = require("express");
const app = express();
const cors = require("cors");
const postsRouter = require("./routes/postsRouter");
const { PORTS, URLS } = require("./settings/URLS");

app.use(express.json());
app.use(cors());

app.listen(PORTS.postsPort, () => console.log(`posts service running at: ${URLS.postsURL}`));

app.use(postsRouter);
