const HistoryModel = require("../Models/HistoryPredict.model");
const UserModel = require("../Models/User.model");

class HistoryPredictController {
  async saveResultToHistory(req, res) {
    try {
      const userId = req.params._id;
      const saveResult = req.body;
      const foundUser = await UserModel.findById(userId);
      if (!foundUser) {
        res.status(404).send("user not found");
      }
      foundUser.historyPredict.push(saveResult);
      await foundUser.save();
      res.status(200).send("saved result to history prediction");
    } catch (error) {
      console.log(error);
      res.status(500).send("save result to history is failed!");
    }
  }

  async getHistoryPredict(req, res) {
    try {
      const userId = req.params._id;
      const foundUser = await UserModel.findById(userId);
      if (!foundUser) {
        res.status(404).send("user not found");
      }
      const predictList = foundUser.historyPredict;
      res.send(predictList);
    } catch (error) {
      console.log(error);
      return res.status(500).send("get history predict list of user failed");
    }
  }

  async deleteOneHistory(req, res) {
    try {
      const userId = req.params._userId;
      const historyId = req.params._historyId;

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { historyPredict: { _id: historyId } } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send("Not found User");
      }

      res.status(200).send("delete success");
    } catch (error) {
      console.log(error);
      res.status(500).send("delete history failed");
    }
  }

  async deleteAllHistory(req, res) {
    try {
      const userId = req.params._userId;

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: { historyPredict: [] } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send("Người dùng không được tìm thấy");
      }

      res.status(200).send("Tất cả lịch sử đã được xóa thành công");
    } catch (error) {
      console.log(error);
      res.status(500).send("Lỗi khi xóa lịch sử");
    }
  }
}

module.exports = new HistoryPredictController();

/**
 *
 *
 *
 */
