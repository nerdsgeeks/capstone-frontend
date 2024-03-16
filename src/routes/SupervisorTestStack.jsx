import StaffCleanedRoomScreen from "../components/StaffCleanedRoomScreen/StaffCleanedRoomScreen";
import SupervisorTest from "../screens/Supervisor/SupervisorTest";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
const SupervisorTestStack = () => {

    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle: {
            backgroundColor: "#F89C7B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
            fontWeight: "bold",
            },
        }}
        >
        <Stack.Screen
            name="SupervisorTest"
            component={SupervisorTest}
            options={{
            title: "Supervisor Test",
            }}
        />
        <Stack.Screen
            name="StaffCleanedRoomScreen"
            component={StaffCleanedRoomScreen}
            options={{ title: "Supervisor Test Detail" }}

        />
        </Stack.Navigator>
    );
    }

export default SupervisorTestStack;