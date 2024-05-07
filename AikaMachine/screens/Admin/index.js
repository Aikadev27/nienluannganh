import { View, Text, Image, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleDoubleRight,
  faArrowAltCircleLeft,
  faKey,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native-virtualized-view";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAllMember } from "../../services/auth.service";
import UserItem from "../../components/UserItem";

const adminAvatar = "https://cdn-icons-png.flaticon.com/512/1253/1253685.png";

export default function AdminScreen({ route, navigation }) {
  const navigate = useNavigation();
  const [userList, setUserList] = useState([]);

  // handle refresh screen
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const fetchUser = async () => {
      try {
        const res = await getAllMember();
        if (res) {
          const filteredUsers = res.filter((user) => user._id !== userId);
          setUserList(filteredUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    setRefreshing(false);
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          const res = await getAllMember();
          if (res) {
            const filteredUsers = res.filter((user) => user._id !== userId);
            setUserList(filteredUsers);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }, [userList.length])
  );

  const { adminName, email, userId } = route.params;
  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-row items-center bg-blue-300  h-[100] mt-0  w-full justify-between px-2 py-1">
          <View>
            <Image
              source={{ uri: `${adminAvatar}` }}
              width={30}
              height={30}
              className="mr-4"
            />
            <View>
              <Text className="text-white text-sm">{adminName}</Text>
              <Text className="text-gray-300 italic text-xs">{email}</Text>
            </View>
          </View>
          <TouchableOpacity
            className="mx-3"
            onPress={() => navigate.navigate("Profile")}
          >
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              size={30}
              color="orange"
            />
          </TouchableOpacity>
        </View>
        {userList == [] ? (
          <Text>Loading.....</Text>
        ) : (
          <View className="w-full bg-black">
            <FlatList
              className="max-h-[600] h-[600]  px-1"
              data={userList}
              renderItem={({ item }) => {
                return (
                  <UserItem
                    email={item.email}
                    name={item.fullName}
                    phoneNumber={item.phoneNumber}
                    userId={item._id}
                    role={item.role}
                    key={item._id}
                  />
                );
              }}
            />
            <View className="h-[60] flex-col justify-center items-start px-3 bg-blue-300">
              <View className="flex-row justify-start items-center gap-10">
                <FontAwesomeIcon icon={faKey} color="green" size={20} />
                <Text className="text-white font-bold">
                  Đặt quyền quản trị cho người dùng{" "}
                </Text>
              </View>
              <View className="flex-row justify-start items-center gap-10">
                <FontAwesomeIcon icon={faRemove} color="red" size={20} />
                <Text className="text-white font-bold">
                  Xóa tài khoản người dùng ra khỏi hệ thống{" "}
                </Text>
              </View>
              <View className="flex-row justify-start items-center gap-10">
                <FontAwesomeIcon
                  icon={faArrowAltCircleLeft}
                  color="blue"
                  size={20}
                />
                <Text className="text-white font-bold">
                  Thu hồi quyền quản trị
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
