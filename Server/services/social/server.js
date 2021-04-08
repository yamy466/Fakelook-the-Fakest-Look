const express = require("express");
const app = express();
const cors = require("cors");
const socialRouter = require("./routes/socialRouter");
const { PORTS, URLS } = require("./settings/URLS");

app.use(express.json({limit: '50mb'}));
app.use(cors());

app.listen(PORTS.socialPort, () => console.log(`social service running at: ${URLS.socialURL}`));

app.use(socialRouter);
