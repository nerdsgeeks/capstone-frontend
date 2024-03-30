import * as React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HousekeeperProfile from "../screens/Housekeeper/HousekeeperProfile";
import HousekeeperPerformance from "../screens/Housekeeper/HousekeeperPerformance";

const Stack = createNativeStackNavigator();

const HousekeeperPerformanceStack = () => {
  return (
    <Stack.Navigator initialRouteName="HousekeeperProfile">
      <Stack.Screen
        name="HousekeeperProfile"
        component={HousekeeperProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HousekeeperPerformance"
        component={HousekeeperPerformance}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HousekeeperPerformanceStack;
