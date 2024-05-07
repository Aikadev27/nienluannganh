import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDeleteLeft,
  faPhone,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { deleteOneResult } from "../../services/historyPredict.service";

export default function HistoryPredictItem({
  name,
  img,
  acc,
  label,
  resultId,
  userId,
}) {
  const handleDeleOneResult = async () => {
    try {
      const res = await deleteOneResult(userId, resultId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className=" rounded-md w-full flex-row justify-between bg-white items-center my-2 border border-gray-200 px-1 py-1">
      <View className="flex-row gap-2">
        <View>
          <Image source={{ uri: `${img}` }} className="w-[70] h-[70] rounded" />
        </View>
        <View className="flex-col justify-between">
          <Text>
            Phân Loại:{" "}
            <Text className="  text-orange-600 font-bold">{name}</Text>
          </Text>
          <View>
            <Text className="text-sm text-gray-700 font-bold">
              Bênh: <Text className="  text-blue-600">{label}</Text>
            </Text>
            <Text className="text-sm text-gray-700 font-bold">
              Độ tin cậy: <Text className="  text-blue-600">{acc}/1</Text>
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleDeleOneResult}>
        <FontAwesomeIcon icon={faRemove} size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
}
