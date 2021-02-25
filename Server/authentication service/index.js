const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 4000;

const authRouter = require("./routes/authRoute");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth",authRouter);

app.listen(PORT, () => {
  console.log(`Authentication service is running at port:${PORT}`);
});
