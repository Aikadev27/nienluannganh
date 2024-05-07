import { View, Text, TouchableOpacity } from "react-native";
import { React } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

const NavigateList = [
  {
    label: "HOME",
    navigateTo: "Home",
  },

  {
    label: "PREDICTION HISTORY",
    navigateTo: "History",
  },
  {
    label: "PROFILE",
    navigateTo: "Profile",
  },
  {
    label: "ABOUT APP AND HOW TO USE",
    navigateTo: "AboutApp",
  },
];

const DrawerNavigateLayout = ({ label, navigateTo }) => {
  const navigation = useNavigation();
  return (
    <DrawerItem
      pressColor="orange"
      focused={true}
      label={label}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
    />
  );
};

const DrawerItems = (props) => {
  return NavigateList.map((item, index) => {
    return (
      <DrawerNavigateLayout
        label={item.label}
        navigateTo={item.navigateTo}
        key={index}
      />
    );
  });
};

export default function DrawerViewScreen(props) {
  return (
    <View className="flex-1 py-2 px-1 bg-black">
      <DrawerContentScrollView {...props}>
        <View className="flex-1">
          <DrawerItems />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

// todo:viết chức năng đăng xuất ở backend và cả frontend
