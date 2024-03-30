import * as React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestItemSuppliesOrder from "../screens/RequestItemSuppliesOrder/RequestItemSuppliesOrder";
import HousekeeperRequest from "../screens/Housekeeper/HousekeeperRequest";
import RequestItemCartSupplies from "../screens/RequestItemCartSupplies/RequestItemCartSupplies";
import RequestItemRoomSupplies from "../screens/RequestItemRoomSupplies/RequestItemRoomSupplies";
import RequestItemCartSuppliesOrder from "../screens/RequestItemCartSuppliesOrder/RequestItemCartSuppliesOrder";
import RequestItemRoomSuppliesOrder from "../screens/RequestItemRoomSuppliesOrder/RequestItemRoomSuppliesOrder";

const Stack = createNativeStackNavigator();

const HousekeeperRequestStack = () => {
  return (
    <Stack.Navigator initialRouteName="HousekeeperRequest">
      <Stack.Screen
        name="HousekeeperRequest"
        component={HousekeeperRequest}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RequestItemRoomSupplies"
        component={RequestItemRoomSupplies}
        options={{ title: "Shopping Cart", headerShown: false }}
      />

      <Stack.Screen
        name="RequestItemCartSupplies"
        component={RequestItemCartSupplies}
        options={{ title: "Shopping Cart", headerShown: false }}
      />

      <Stack.Screen
        name="RequestItemRoomSuppliesOrder"
        component={RequestItemRoomSuppliesOrder}
        options={{ title: "Shopping Cart", headerShown: false   }}
      />

      <Stack.Screen
        name="RequestItemCartSuppliesOrder"
        component={RequestItemCartSuppliesOrder}
        options={{ title: "Shopping Cart", headerShown: false  }}
      />
    </Stack.Navigator>
  );
};

export default HousekeeperRequestStack;
