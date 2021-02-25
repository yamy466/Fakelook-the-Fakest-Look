const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 9000;

const postsRouter = require("./routes/postsRoute");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/posts",postsRouter);

app.listen(PORT, () => {
  console.log(`posts service is running at port:${PORT}`);
});
