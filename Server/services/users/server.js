const express = require("express");
const app = express();
const cors = require("cors");
const usersRouter = require("./routes/usersRoute");
const { PORTS, URLS } = require("./settings/URLS");

app.use(express.json());
app.use(cors());

app.listen(PORTS.usersPort, () => console.log(`users service running at: ${URLS.usersURL}`));

app.use(usersRouter);
