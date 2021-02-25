const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 5000;

const identityRouter = require("./routes/identityRoute");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/identity",identityRouter);

app.listen(PORT, () => {
  console.log(`identity service is running at port:${PORT}`);
});
