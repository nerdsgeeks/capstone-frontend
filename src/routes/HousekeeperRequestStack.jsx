import * as React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestItemSuppliesOrder from "../screens/RequestItemSuppliesOrder/RequestItemSuppliesOrder";
import HousekeeperRequest from "../screens/Housekeeper/HousekeeperRequest";

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
        name="RequestItemSuppliesOrder"
        component={RequestItemSuppliesOrder}
        options={{ title: "Shopping Cart" }}
      />
    </Stack.Navigator>
  );
};

export default HousekeeperRequestStack;
