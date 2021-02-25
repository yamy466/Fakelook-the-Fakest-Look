const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 7000;

const notificationRouter = require("./routes/notificationRoute");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/notify",notificationRouter);

app.listen(PORT, () => {
  console.log(`Authentication service is running at port:${PORT}`);
});
