import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { getData } from "../../services/storage.service";
import {
  deleteAllResult,
  getPredictList,
} from "../../services/historyPredict.service";
import HistoryPredictItem from "../../components/HistoryPredictItem";

export default function PredictionHistory({ navigation }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [predictList, setPredictList] = useState([]);
  const [status, setStatus] = useState(false);

  const fetchUserData = async (userId) => {
    try {
      const data = await getPredictList(userId);
      // console.log("predict List", data);
      if (data) {
        setPredictList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fecthUserStore = async () => {
    const data = await getData("user-info");
    if (data) {
      setUserInfo(data);
      setUserId(data.userId);
      setIsLogin(true);
    }
    if (data === null) {
      setIsLogin(false);
    }
  };
  useEffect(() => {
    fecthUserStore();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (!userId || userId === null) {
        return;
      } else {
        fetchUserData(userId);
        setStatus(true);

        // console.log("đã có được userId");
      }
    }, [userId, predictList])
  );

  const handleDeleteAllResult = async () => {
    try {
      const res = await deleteAllResult(userId);
      if (res) {
        setPredictList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const notifyBefoDelete = () => {
    Alert.alert(
      "sẽ không thể khôi phục sau khi bạn xóa",
      "Bạn có chắc chắn xóa toàn bộ không?",
      [
        {
          text: "Tôi rõ",
          onPress: handleDeleteAllResult,
        },
        {
          text: "Hủy",
        },
      ]
    );
  };

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-xs uppercase text-center my-2 font-bold text-green-600 border-b border-gray-600 py-2">
        Lịch sử dự đoán các loại bệnh
      </Text>
      {predictList ? (
        <View className="w-[370] h-[670] px-2 py-1 mb-4  bg-gray-400">
          <TouchableOpacity onPress={notifyBefoDelete}>
            <Text className="text-right underline italic text-sm ">
              xóa tất cả
            </Text>
          </TouchableOpacity>
          <FlatList
            data={predictList}
            renderItem={({ item }) => {
              return (
                <HistoryPredictItem
                  name={item.modelName}
                  acc={item.accuracy}
                  img={item.predictImage}
                  label={item.labelResult}
                  resultId={item._id}
                  userId={userId}
                  key={item._id}
                />
              );
            }}
          />
        </View>
      ) : predictList == [] || predictList == null ? (
        <View className="flex-1 justify-center items-center">
          <Text>Chưa có kết quả nào</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
