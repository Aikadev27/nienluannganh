import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Country } from "../../util/country";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import { Register } from "../../services/auth.service";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  // const [gender, setGender] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [about, setAbout] = useState("");

  const navigation = useNavigation();

  const handleCreateAccount = async () => {
    try {
      const formRegis = {
        email: email,
        password: password,
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        about: about,
      };

      const response = await Register(formRegis);
      if (response) {
        Alert.alert("", "Đăng Ký Thành Công", [
          {
            text: "Home",
            onPress: () => navigation.navigate("Home"),
          },
          {
            text: "Login Now",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 justify-center items-center bg-gray-200"
    >
      <View className="w-[370] h-[700]  px-4 rounded-xl bg-white">
        <Text className="font-bold text-xl uppercase text-gray-600 mb-3 text-right">
          Sign Up
        </Text>
        <View className="my-1">
          <Text className="text-gray-500">Email (*)</Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            inputMode="email"
            value={email}
            placeholder="email@gmail.com"
            className="border border-blue-400 h-[50] rounded-lg my-1 px-3 text-sm text-gray-700"
          />
        </View>
        <View className="my-1">
          <Text className="text-gray-500">Full Name (*)</Text>
          <TextInput
            onChangeText={(text) => setFullname(text)}
            value={fullName}
            placeholder="Ex: Dinh Hoang Nhan"
            className="border border-blue-400 h-[50] rounded-lg my-1 px-3 text-sm text-gray-700"
          />
        </View>
        <View className="my-1">
          <Text className="text-gray-500 mb-1">City (*)</Text>

          <SelectList
            data={Country}
            setSelected={(val) => {
              setAddress(val);
            }}
            save="value"
            placeholder="Select your City"
          />
        </View>
        <View className="my-1">
          <Text className="text-gray-500">Phone Number (*)</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholder="0123456"
            className="border border-blue-400 h-[50] rounded-lg my-1 px-3 text-sm text-gray-700"
          />
        </View>
        <View className="my-1">
          <Text className="text-gray-500">Password (*)</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            className="border border-blue-400 h-[50] rounded-lg my-1 px-3 text-sm text-gray-700"
          />
        </View>
        <View className="my-1">
          <Text className="text-gray-500">Somethings about you</Text>
          <TextInput
            value={about}
            onChangeText={(text) => setAbout(text)}
            className="border border-blue-400 h-[100] rounded-lg my-1 px-3 text-sm text-gray-700"
          />
        </View>
        <View className="my-1">
          <TouchableOpacity onPress={handleCreateAccount}>
            <Text className="w-full text-center bg-blue-600 text-white py-3 font-bold text-xl rounded-lg">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
        <View className="my-1 flex-row items-center justify-end">
          <Text>Already have an accout?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="text-blue-500">Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
