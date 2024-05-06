import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { getData } from "../../services/storage.service";

const img_gif =
  "https://www.simform.com/mobile-patterns/blog/wp-content/uploads/2019/04/designing-mobile-app-splash-screen.gif";

export default function Plash() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(navigateHome, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const navigateHome = () => {
    const data = getData("user-info");
    if (!data) {
      navigation.navigate("Login");
    }
    navigation.navigate("Home");
  };

  return (
    <View>
      <Image
        source={{ uri: `${img_gif}` }}
        className="w-full  h-full object-cover"
      />
    </View>
  );
}
