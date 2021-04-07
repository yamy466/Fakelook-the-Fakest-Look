const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const { PORTS, URLS } = require("./settings/URLS");

app.use(express.json());
app.use(cors());

app.listen(PORTS.authPort, () => console.log(`auth service running at: ${URLS.authURL}`));

app.use(authRouter);
