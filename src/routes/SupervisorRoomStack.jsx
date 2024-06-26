import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SupervisorRoom from "../screens/Supervisor/SupervisorRoom";
import SupervisorRoomDetail from "../screens/Supervisor/SupervisorRoomDetail";
import InspectionReview from "../screens/Supervisor/InspectionReview";

const Stack = createNativeStackNavigator();
const SupervisorRoomStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SupervisorRoom"
        component={SupervisorRoom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SupervisorRoomDetail"
        component={SupervisorRoomDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InspectionReview"
        component={InspectionReview}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SupervisorRoomStack;
