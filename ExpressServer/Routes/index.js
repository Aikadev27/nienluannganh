const userRouter = require("./User.route");
const historyPredictRouter = require("./HistoryPredict.route");
function router(app) {
  app.use("/api/user", userRouter);
  app.use("/api/historyPredict", historyPredictRouter);
}

module.exports = router;
