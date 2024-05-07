import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  clearStoreData,
  getData,
  storageData,
} from "../../services/storage.service";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAddressCard,
  faEdit,
  faLocationDot,
  faMailBulk,
  faPen,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { LogOut, updateInfo } from "../../services/auth.service";
import { reloadApp } from "../../util/country";
const adminAvatar = "https://cdn-icons-png.flaticon.com/512/1253/1253685.png";
const temptAvatar =
  "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png";

export default function Profile({ navigation }) {
  const navi = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [about, setAbout] = useState("");

  // save change
  const handleSaveChange = async () => {
    try {
      const userId = userInfo.userId;
      const updatedInfo = { ...userInfo, about: about };
      console.log("data can cap nhap gui den server", updatedInfo);
      const afterUpdateInfo = await updateInfo(userId, updatedInfo);
      if (afterUpdateInfo) {
        await storageData("user-info", afterUpdateInfo);
        Alert.alert("cap nhat thanh cong");
      }
    } catch (error) {
      console.log("Lỗi tại hàm handleSaveChange", error);
    }
  };

  // logout
  const handleLogout = async () => {
    try {
      const userId = userInfo.userId;
      const res = await LogOut(userId);
      const statusRemoveInfo = await clearStoreData("user-info");
      if (res) {
        Alert.alert("dang xuat thanh cong");
      }
      if (statusRemoveInfo) {
        setIsLogin(false);
        Alert.alert("", "Đăng xuất thành công", [
          {
            text: "OK",
            onPress: () => {
              reloadApp();
              navi.navigate("Home");
            },
          },
        ]);
      }
    } catch (error) {
      console.log("lỗi ở hàm handleLogout", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fecthUserStore = async () => {
        const data = await getData("user-info");
        console.log(data);
        if (data) {
          setUserInfo(data);
          setIsLogin(true);
          setAbout(data.about);
        }
        if (data === null) {
          setIsLogin(false);
        }
      };
      fecthUserStore();
    }, [])
  );
  return (
    <KeyboardAvoidingView className="flex-1 items-center justify-center bg-black mb-10">
      <View>
        {isLogin ? (
          <View className="w-[350] h-[700] bg-white p-2  rounded-xl ">
            <View>
              <TouchableOpacity
                onPress={handleLogout}
                className=" w-[80] h-[40] flex justify-center items-center rounded-md bg-black my-2"
              >
                <Text className="text-white text-sm font-bold">Log out</Text>
              </TouchableOpacity>
            </View>
            {userInfo.role == 0 && (
              <TouchableOpacity
                onPress={() =>
                  navi.navigate("Admin", {
                    adminName: userInfo.fullName,
                    email: userInfo.email,
                    userId: userInfo.userId,
                  })
                }
                className=" w-[80] h-[40] flex justify-center items-center rounded-md bg-blue-500 my-2"
              >
                <Text className="text-white text-sm font-bold">Admin page</Text>
              </TouchableOpacity>
            )}

            <View className="w-full h-[200] border-b border-gray-300 flex items-center mt-10">
              {userInfo.role == 0 ? (
                <Image
                  className="rounded-full object-cover w-[150] h-[150] my-3"
                  source={{ uri: `${adminAvatar}` }}
                />
              ) : userInfo.role == 1 ? (
                <Image
                  source={{ uri: `${temptAvatar}` }}
                  className="rounded-full object-cover w-[150] h-[150] my-3"
                />
              ) : (
                <></>
              )}
              <View>
                <Text className="text-center text-xl font-bold">
                  {userInfo.fullName}
                </Text>
              </View>
            </View>
            <View className="mt-[20] px-3">
              <View className="flex-row justify-between py-2  border-b border-gray-100 items-center my-1 max-h-[50]">
                <FontAwesomeIcon icon={faMailBulk} size={26} color="red" />
                <Text className="text-gray-600 text-lg font-semibold  truncate max-w-[300]">
                  {userInfo.email}
                </Text>
              </View>
              <View className="flex-row justify-between py-2  border-b border-gray-100 items-center my-1 max-h-[50]">
                <FontAwesomeIcon icon={faLocationDot} size={26} color="blue" />
                <Text className="text-gray-600 text-lg font-semibold  truncate max-w-[300]">
                  {userInfo.address}
                </Text>
              </View>
              <View className="flex-row justify-between py-2  border-b border-gray-100 items-center my-1 max-h-[50]">
                <FontAwesomeIcon icon={faPhone} size={26} color="green" />
                <Text className="text-gray-600 text-lg font-semibold  truncate max-w-[300]">
                  {userInfo.phone}
                </Text>
              </View>
              <View className="flex-row gap-1 justify-between  items-center">
                <View className="flex-row gap-1  items-center">
                  <Text>ABOUT ME</Text>
                  <FontAwesomeIcon icon={faAddressCard} />
                </View>
                <FontAwesomeIcon icon={faEdit} color="gray" />
              </View>
              <View className="w-full h-[80] max-h-[90] rounded-sm border border-gray-300">
                <TextInput
                  className="w-full h-full px-4 py-1 truncate"
                  defaultValue={about}
                  onChangeText={(newText) => setAbout(newText)}
                />
              </View>
              <TouchableOpacity onPress={handleSaveChange}>
                <Text className="text-center mt-2 bg-blue-500 p-1 text-white font-bold rounded-md">
                  Save Change
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white uppercase">bạn chưa đăng nhập</Text>
            <TouchableOpacity onPress={() => navi.navigate("Login")}>
              <Text className="text-white border border-blue-500 p-4 mt-20 rounded-lg uppercase font-bold">
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
