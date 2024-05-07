// const { Schema, model, Types } = require("mongoose");
const { model, Schema } = require("mongoose");

const HistoryPredictSchema = new Schema({
  modelName: String,
  predictImage: String,
  labelResult: String,
  accuracy: Number,
});

module.exports = model("HistoryPredict", HistoryPredictSchema);
