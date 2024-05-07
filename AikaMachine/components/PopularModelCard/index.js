import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PopularModelCard({
  modelName,
  imageUri,
  desc,
  api,
  disable,
}) {
  const navigation = useNavigation();
  return (
    <View className="w-[350] h-[300]  mx-1 bg-emerald-700 rounded-md px-4 py-1">
      <TouchableOpacity
        disabled={disable}
        onPress={() =>
          navigation.navigate("modelDetail", {
            modelName: modelName,
            desc: desc,
            api_route: api,
          })
        }
        className="w-full h-[65%] border my-2"
      >
        <View>
          <Image
            source={{
              uri: `${imageUri}`,
            }}
            className="w-full h-full border-none outline-none"
          />
        </View>
      </TouchableOpacity>
      <Text className="font-bold text-orange-400 text-sm uppercase my-1">
        Phân Loại: <Text className="text-white lowercase">{modelName}</Text>
      </Text>
      <View>
        <Text
          className="font-bold text-orange-400 text-sm uppercase my-1 "
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          Chức Năng: <Text className="text-white  lowercase ">{desc}</Text>
        </Text>
      </View>
    </View>
  );
}
