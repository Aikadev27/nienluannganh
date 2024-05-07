import { View, Text, Image, Alert } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowAltCircleLeft,
  faEdit,
  faKey,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { deleteOneUserById, updateInfo } from "../../services/auth.service";

const temptAvatar =
  "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png";

export default function UserItem({ name, email, phoneNumber, userId, role }) {
  const handleDeleteUser = () => {
    Alert.alert(
      "Bạn có chắc chắn xóa tài khoản người dùng này không?",
      "sau khi xóa sẽ không thể khôi phục",
      [
        {
          text: "Hủy",
        },
        { text: "Xóa", onPress: deleteUser },
      ]
    );
  };
  const deleteUser = async () => {
    try {
      const res = await deleteOneUserById(userId);
      console.log(res);
      console.log(userId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetRole = () => {
    Alert.alert("Bạn có muốn đặt người dùng này có quyền quản trị không?", "", [
      {
        text: "Hủy",
      },
      {
        text: "Có",
        onPress: setRoleForUser,
      },
    ]);
  };

  const setRoleForUser = async () => {
    try {
      const formData = {
        role: 0,
      };
      const res = await updateInfo(userId, formData);
      if (res) {
        console.alert("cập nhật thành công");
      }
    } catch (error) {}
  };

  const removeRole = async () => {
    try {
      const formData = {
        role: 1,
      };
      const res = await updateInfo(userId, formData);
      if (res) {
        console.alert("cập nhật thành công");
      }
    } catch (error) {}
  };

  const handleRemoveRole = () => {
    Alert.alert(
      "Bạn có muốn thu hồi quyền quản trị của người này không ?",
      "",
      [
        {
          text: "Hủy",
        },
        {
          text: "Có",
          onPress: removeRole,
        },
      ]
    );
  };

  return (
    <View className="border-b flex-row justify-between items-center border-gray-300 my-1 px-4 rounded-md bg-white py-1 w-full">
      <View>
        <View>
          <Image source={{ uri: `${temptAvatar}` }} width={50} height={50} />
        </View>
        <View>
          <View className="flex-row items-center">
            <Text className="text-sm text-gray-800 w-[70]">Full Name:</Text>
            <Text className="ml-2 text-sm font-bold text-blue-700">
              {" "}
              {name}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-sm text-gray-800 w-[70]">Email:</Text>
            <Text className="ml-2 text-sm font-bold text-blue-700">
              {" "}
              {email}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-sm text-gray-800 w-[70]">Phone:</Text>
            <Text className="ml-2 text-sm font-bold text-blue-700">
              {" "}
              {phoneNumber}
            </Text>
          </View>
          {role == 1 ? (
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-800 w-[70]">Chức vụ:</Text>
              <Text className="ml-2 text-sm font-bold text-blue-700">
                {" "}
                Người dùng cơ bản
              </Text>
            </View>
          ) : role == 0 ? (
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-800 w-[70]">Chức vụ:</Text>
              <Text className="ml-2 text-sm font-bold text-blue-700">
                {" "}
                quản trị viên
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
      <View className="flex-col justify-between  h-[100]">
        <View>
          <TouchableOpacity onPress={handleSetRole}>
            <FontAwesomeIcon icon={faKey} size={20} color="green" />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={handleDeleteUser}>
            <FontAwesomeIcon icon={faRemove} size={25} color="red" />
          </TouchableOpacity>
        </View>

        {role == 0 && (
          <View>
            <TouchableOpacity onPress={handleRemoveRole}>
              <FontAwesomeIcon
                icon={faArrowAltCircleLeft}
                size={25}
                color="blue"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
