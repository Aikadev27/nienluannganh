import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getData } from "../../services/storage.service";
import { saveResultToHistory } from "../../services/historyPredict.service";

export default function ResultScreen({ route }) {
  const { label, accuracy, imageUri, modelName } = route.params;
  const [isLogin, setIsLogin] = useState(false);
  const navigation = useNavigation();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fecthUserStore = async () => {
      const data = await getData("user-info");
      if (data) {
        setUserId(data.userId);
        setIsLogin(true);
      }
      if (data === null) {
        setIsLogin(false);
      }
    };
    fecthUserStore();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (!userId || userId === null) {
        console.log("userId không nhận được");
      } else {
        // fetchUserData(userId);
        console.log(userId);
      }
    }, [userId])
  );

  const handleSaveResultToHistory = async () => {
    try {
      img = imageUri.toString();
      const formData = {
        labelResult: label,
        accuracy: accuracy,
        predictImage: img,
        modelName: modelName,
      };
      const resData = await saveResultToHistory(userId, formData);
      if (resData) {
        Alert.alert("Đã Lưu Thành Công");
        console.log("save thanh cong roi");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-2 bg-black">
      <View className="my-3">
        <Text className="text-center uppercase font-bold text-cyan-500 text-xl">
          predicted results
        </Text>
      </View>
      <View className="w-full h-[250] p-4 bg-slate-200 rounded-md shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <Image source={{ uri: `${imageUri}` }} className="w-full h-full" />
      </View>
      <View className="w-full h-[200] bg-cyan-500 my-4 p-4 flex justify-between rounded-3xl">
        <View className="bg-white w-full h-[50%] flex flex-row items-center px-4 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-2">
          <Text className="text-left text-xl">Kết Quả Dự Đoán: {label}</Text>
        </View>
        <View className="bg-white w-full h-[50%] flex flex-row items-center px-4 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-2">
          <Text className="text-left text-xl">Độ Chính Xác: {accuracy}/1</Text>
        </View>
      </View>

      <View className="w-full flex flex-row justify-between items-center px-10 my-20">
        <TouchableOpacity
          className="w-[100] h-[50] bg-lime-500 flex flex-row items-center justify-center rounded-xl"
          onPress={() => navigation.goBack()}
        >
          <Text>
            <Icon name="backward" size={30} color={"white"} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[100] h-[50] bg-blue-500 flex flex-row items-center justify-center rounded-xl "
          // disabled={true}
          onPress={handleSaveResultToHistory}
        >
          <Text>
            <Icon name="bookmark" size={30} color={"white"} />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
