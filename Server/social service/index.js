const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 6000;

const socialRouter = require("./routes/socialRoute");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/social",socialRouter);

app.listen(PORT, () => {
  console.log(`Social service is running at port:${PORT}`);
});
