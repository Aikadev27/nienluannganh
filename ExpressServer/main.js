const express = require("express");
require("./config/mongoose.config");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./Routes");
const port = process.env.PORT || 3000;

app.use(
  cors({
    // origin: "http://localhost:8080",
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router(app);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
