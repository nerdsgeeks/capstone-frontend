import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HousekeeperHome from "../screens/Housekeeper/HousekeeperHome";
import RoomDetail from "../screens/RoomDetail/RoomDetail";
import RoomDetailRequestItem from "../screens/RoomDetailRequestItem/RoomDetailRequestItem";
import CameraComponent from "../components/Camera/CameraComponent";
import StaffCleanedRoomScreen from "../components/StaffCleanedRoomScreen/StaffCleanedRoomScreen";

const Stack = createNativeStackNavigator();
const HousekeeperHomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HousekeeperHome">
      <Stack.Screen
        name="HousekeeperHome"
        component={HousekeeperHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RoomDetail"
        component={RoomDetail}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="RoomDetailRequestItem"
        component={RoomDetailRequestItem}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraComponent}
        options={{ title: "Camera" }}
      />
      <Stack.Screen
        name="StaffCleanedRoomScreen"
        component={StaffCleanedRoomScreen}
      />
    </Stack.Navigator>
  );
};

export default HousekeeperHomeStack;
