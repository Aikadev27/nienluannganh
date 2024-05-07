const express = require("express");
const router = express.Router();
const HistoryPredictController = require("../Controllers/HistoryPredict.controller");

router.get(
  "/getHistoryPredict/:_id",
  HistoryPredictController.getHistoryPredict
);
router.post(
  "/saveResultToHistory/:_userId",
  HistoryPredictController.saveResultToHistory
);

router.patch(
  "/deleteOneHistory/:_userId/:_historyId",
  HistoryPredictController.deleteOneHistory
);
router.patch(
  "/deleteAllHistory/:_userId",
  HistoryPredictController.deleteAllHistory
);
module.exports = router;
