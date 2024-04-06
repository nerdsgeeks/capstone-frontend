import * as React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HousekeeperHome from "../screens/Housekeeper/HousekeeperHome";
import RoomDetail from "../screens/RoomDetail/RoomDetail";
import RequestItemSupplies from "../screens/RequestItemSupplies/RequestItemSupplies";
import CartIcon from "../SVG/CartIcon";
import RequestItemSuppliesOrder from "../screens/RequestItemSuppliesOrder/RequestItemSuppliesOrder";
import CameraComponent from "../components/Camera/CameraComponent";
import StaffCleanedRoomScreen from "../components/StaffCleanedRoomScreen/StaffCleanedRoomScreen";

const Stack = createNativeStackNavigator();
// Function to create a custom right component
function CustomHeaderRight() {
  return (
    <TouchableOpacity onPress={() => alert("Pressed!")}>
      <Text>Press Me</Text>
    </TouchableOpacity>
  );
}
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
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="RequestItemSupplies"
        component={RequestItemSupplies}
        options={{ title: "", headerShown: false }}
        // options={({ route }) => ({
        //   title: route.params.screenTitle || "Welcome",
        //   headerRight: () => (
        //     <TouchableOpacity
        //       onPress={() => alert("This is a button!")}
        //       style={{}}
        //     >
        //       <CartIcon stroke="#000000"></CartIcon>
        //     </TouchableOpacity>
        //   ),
        // })}
      />

      <Stack.Screen
        name="RequestItemSuppliesOrder"
        component={RequestItemSuppliesOrder}
        options={{ title: "Shopping Cart" }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraComponent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StaffCleanedRoomScreen"
        component={StaffCleanedRoomScreen}
        options={{ title: "", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HousekeeperHomeStack;
