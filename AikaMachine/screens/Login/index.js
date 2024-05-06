import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Login } from "../../services/auth.service";
import { useState } from "react";
import { storageData } from "../../services/storage.service";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  // const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleGoHome = () => {
    navigation.navigate("Home");
  };

  const handleLogin = async () => {
    const form = {
      email: email,
      password: pass,
    };
    if (!email || email == "") {
      Alert.alert("Email is not empty");
      return;
    } else if (!pass || pass == "") {
      Alert.alert("password is not empty");
      return;
    }
    const { userData } = await Login(form);
    if (userData != null) {
      storageData("user-info", userData);
      Alert.alert("Notification", "Login Success!", [
        {
          text: "Back Home",
          onPress: () => handleGoHome(),
        },
      ]);
      // Alert.alert("Notification", "Login Success!");
    } else {
      Alert.alert(
        "Notification",
        "Login failed! Please check your Email or Password!"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex justify-center items-center flex-1  bg-black"
      behavior="padding"
    >
      <View className="w-[350] h-[600] bg-white p-2  rounded-xl shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
        {/* logo */}
        <View className="text-center  my-2   flex-col items-center">
          <Image
            source={require("../../assets/aikaLogo.jpeg")}
            className="w-[150] h-[150] rounded-full"
          />
        </View>
        {/* email */}
        <View className="px-2">
          <View className="flex-row items-center gap-1 my-2">
            <Text className="text-base  text-cyan-700 uppercase font-semibold">
              Email
            </Text>
          </View>
          <TextInput
            className={
              "border-x-2 border-cyan-700 px-3 py-2 rounded-lg  text-gray-600 text-xl border-b-2"
            }
            placeholder="...@.com"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        {/* pass */}
        <View className="px-2">
          <View className="flex-row items-center gap-1 my-2">
            <Text className="text-base  text-cyan-700 uppercase font-semibold">
              password
            </Text>
          </View>
          <TextInput
            className={
              "border-x-2 border-cyan-700 px-3 py-2 rounded-lg  text-gray-600 text-xl border-b-2"
            }
            secureTextEntry
            placeholder="Enter your password"
            onChangeText={(text) => setPass(text)}
            value={pass}
          />
        </View>
        <TouchableOpacity
          className="w-full px-4 h-[60] mt-[70] bg-blue-400 flex-row items-center justify-center rounded-xl"
          onPress={handleLogin}
        >
          <Text className=" text-white font-bold text-lg">LOGIN</Text>
        </TouchableOpacity>
        <View className="flex-row justify-end items-center px-3 py-3  gap-1">
          <Text>Not have account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text className="text-blue-500 underline font-semibold ">
              regis now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
