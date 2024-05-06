const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://aikadev27:aikadev2706@aikamachinecluster.d3xjcso.mongodb.net/"
  )
  .then(() => {
    console.log("connected database");
  })
  .catch(() => {
    console.log("failed to connect to database");
  });
