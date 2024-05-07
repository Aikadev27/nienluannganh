import axios from "./express.service";

export const getPredictList = async (userId) => {
  try {
    const res = await axios.get(`/historyPredict/getHistoryPredict/${userId}`);
    // console.log("data nhận được sau khi get lịch sử dự đoán: ", res.data);
    return res.data;
  } catch (error) {
    console.log("lỗi ở hàm getPredictList");
  }
};

export const saveResultToHistory = async (userId, formData) => {
  try {
    const res = await axios.post(
      `/historyPredict/saveResultToHistory/${userId}`,
      formData
    );
    console.log(
      "ket qua sau khi luu predict vao his duoc server tra ve",
      res.data
    );
    return res.data;
  } catch (error) {
    console.log("lỗi ở hàm saveResultToHistory", error);
  }
};

export const deleteOneResult = async (userId, resultId) => {
  try {
    const res = await axios.patch(
      `/historyPredict/deleteOneHistory/${userId}/${resultId}`
    );
    console.log(res.data);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllResult = async (userId) => {
  try {
    const res = await axios.patch(`/historyPredict/deleteAllHistory/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
