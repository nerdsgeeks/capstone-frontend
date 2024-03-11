import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SupervisorRequest from "../screens/Supervisor/SupervisorRequest";
import RequestDetail from "../screens/Request/RequestDetail";

const Stack = createNativeStackNavigator();
const SupervisorRequestStack = () => {
  return (
    <Stack.Navigator initialRouteName="SupervisorRequest">
            <Stack.Screen
              name="SupervisorRequest"
                component={SupervisorRequest}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RequestDetail"
                component={RequestDetail}
                options={{ title: "" }}
            />
        </Stack.Navigator>
  );
};

export default SupervisorRequestStack;
