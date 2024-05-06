import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import PopularModelCard from "../../components/PopularModelCard";
import ThinModelCard from "../../components/ThinModelCard";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../../services/storage.service";
const benhtrenlua_image =
  "https://img.ntdvn.net/2021/06/ntdvn_ch-541310-1920.jpg";
const contrunghailua_image =
  "https://i.ex-cdn.com/nongnghiep.vn/files/bao_in/2020/05/03/09020995anh_3-090209-104238.jpeg";
const emptyImageModel =
  "https://www.simplilearn.com/ice9/free_resources_article_thumb/React_Native_Tutorial.jpg";

const adminImg =
  "https://static.vecteezy.com/system/resources/previews/009/784/096/original/avatar-with-gear-flat-design-icon-of-manager-vector.jpg";

const normalImg =
  "https://elakeviewcenter.org/wp-content/uploads/sites/2/2022/09/person.png";
const modelList = [
  {
    id: 1,
    imgUri: benhtrenlua_image,
    modelName: "Bệnh trên lúa ",
    desc: "nhận dạng và phân loại bệnh do vi khuẩn trên cây lúa",
    api: "benhtrenlua",
    disable: false,
  },
  {
    id: 2,
    imgUri: contrunghailua_image,
    modelName: "Côn Trùng Hại Lúa",
    desc: "model côn trùng hại lúa",
    api: "contrunghailua",
    disable: false,
  },
  {
    id: 3,
    imgUri: emptyImageModel,
    modelName: "Tính năng đang được phát triển",
    desc: "Tính năng đang được phát triển",
    api: "",
    disable: true,
  },
  {
    id: 4,
    imgUri: emptyImageModel,
    modelName: "Tính năng đang được phát triển",
    desc: "Tính năng đang được phát triển",
    api: "",
    disable: true,
  },
];

export default function HomeScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  useFocusEffect(
    useCallback(() => {
      const fecthUserStore = async () => {
        const data = await getData("user-info");
        if (data) {
          setUserInfo(data);
          setIsLogin(true);
        }
        if (data === null) {
          setIsLogin(false);
        }
      };
      fecthUserStore();
    }, [])
  );

  return (
    <SafeAreaView className="h-full bg-black pb-16">
      <ScrollView>
        {/* search bar */}
        <View className="mt-10 mx-5 flex flex-row  justify-start p-2  ">
          {isLogin ? (
            <View className=" w-full h-[50] flex-row-reverse justify-between items-center">
              <TouchableOpacity
                className="w-[50] h-full"
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              >
                {userInfo.role == 0 ? (
                  <Image
                    className="rounded-full object-cover w-full h-full"
                    // nhó thay chỗ này
                    source={{ uri: `${adminImg}` }}
                  />
                ) : (
                  <Image
                    className="rounded-full object-cover w-full h-full"
                    source={{ uri: `${normalImg}` }}
                    width={60}
                    height={0}
                  />
                )}
              </TouchableOpacity>
              <View className="ml-28">
                <Text className="text-gray-400">{userInfo.fullName}</Text>
              </View>
            </View>
          ) : (
            <View className="w-full h-[50] flex-row-reverse gap-4">
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text className="h-full text-blue-500 border border-gray-200 p-2 text-center rounded-md">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* popular model cards */}
        <View className="mx-3">
          {/* 2 text */}
          <View className="flex flex-row justify-between my-4 px-2">
            <Text className="text-blue-600 text-sm font-bold">
              Trên cây lúa
            </Text>
          </View>
          {/* model list  */}

          <View>
            <FlatList
              data={modelList.slice(0, 2)}
              renderItem={({ item }) => {
                return (
                  <View key={item.id}>
                    <PopularModelCard
                      imageUri={item.imgUri}
                      modelName={item.modelName}
                      desc={item.desc}
                      api={item.api}
                      disable={item.disable}
                    />
                  </View>
                );
              }}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              // scrollEnabled={false}
              // nestedScrollEnabled={true}
            />
          </View>
        </View>

        {/* all model */}
        <View className="mx-2">
          {/* 2 text */}
          <View className="flex flex-row justify-between my-4 px-2 ">
            <Text className="text-orange-600 text-sm font-bold">Đề xuất</Text>
          </View>

          {/* all features model list */}
          <View className="mx-2">
            <FlatList
              data={modelList.slice(0, 4)}
              renderItem={({ item }) => {
                return (
                  <View key={item.id}>
                    <ThinModelCard
                      imageUri={item.imgUri}
                      desc={item.desc}
                      modelName={item.modelName}
                      api={item.api}
                      disable={item.disable}
                    />
                  </View>
                );
              }}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
