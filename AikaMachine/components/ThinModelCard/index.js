import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ThinModelCard({
  modelName,
  desc,
  imageUri,
  api,
  disable,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={disable}
      className="w-full h-[70] bg-slate-100 my-2 rounded-lg p-1 border  flex justify-center"
      onPress={() =>
        navigation.navigate("modelDetail", {
          modelName: modelName,
          desc: desc,
          api_route: api,
        })
      }
    >
      <View className=" flex flex-row justify-between ">
        <Image source={{ uri: `${imageUri}` }} width={100} height={50} />
        <View className="ml-2  flex-1 bg-white px-2 justify-center items-start rounded-lg">
          <Text className="text-xs  font-bold text-green-500">
            Model Name:{" "}
            <Text className="lowercase  font-light text-black">
              {modelName}
            </Text>
          </Text>
          <Text
            className="text-xs  font-bold text-green-500"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Desc:{" "}
            <Text className="lowercase  font-light text-black">{desc}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
