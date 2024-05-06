const { Schema, model, Types } = require("mongoose");

const HistoryPredictSchema = new Schema({
  modelName: { type: String },
  predictImage: { type: String },
  labelResult: { type: String },
  accuracy: { type: Number },
});

module.exports = model("HistoryPredict", HistoryPredictSchema);
