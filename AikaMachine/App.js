import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import PredictionHistory from "./screens/PredictionHistory";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModelDetail from "./screens/ModelDetail";
import ResultScreen from "./screens/ResultScreen";
import Plash from "./screens/Plash";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import AdminScreen from "./screens/Admin";
import DrawerViewScreen from "./components/DrawerView";
import AboutAppScreen from "./screens/AboutApp";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const tabFocusedColor = "#00b4d8";

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    backgroundColor: "#000000",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    height: 60,
  },
};

const iconSize = 30;

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="plash">
      <Tab.Screen
        name="Splash"
        component={Plash}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Admin"
        component={AdminScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="AboutApp"
        component={AboutAppScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="History"
        component={PredictionHistory}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className="items-center justify-center">
                <MaterialIcons
                  name="history"
                  size={iconSize}
                  color={focused ? `${tabFocusedColor}` : "white"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className="items-center justify-center">
                <AntDesign
                  name="home"
                  size={iconSize}
                  color={focused ? `${tabFocusedColor}` : "white"}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className="items-center justify-center">
                <AntDesign
                  name="user"
                  size={iconSize}
                  color={focused ? `${tabFocusedColor}` : "white"}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: null,
        headerBackVisible: true,
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="plash" component={Plash} />
      <Stack.Screen name="history" component={PredictionHistory} />
      <Stack.Screen name="modelDetail" component={ModelDetail} />
      <Stack.Screen name="resultScreen" component={ResultScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="admin" component={AdminScreen} />
      <Stack.Screen name="aboutApp" component={AboutAppScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function StackDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={(props) => <DrawerViewScreen />}
    >
      <Drawer.Screen name="asdasd" component={TabNavigator} />
      <Drawer.Screen name="asgdfgfdasd" component={RegisterScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" />
      <StackDrawer />
      {/* <TabNavigator /> */}
    </NavigationContainer>
  );
}
