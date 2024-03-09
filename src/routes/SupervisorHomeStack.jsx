import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";



const Stack = createNativeStackNavigator();
const SupervisorHomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="SupervisorHome">
            <Stack.Screen
                name="SupervisorHome"
                component={SupervisorHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SuperVisorRequest"
                component={RequestDetail}
                options={{ title: "" }}
            />
        </Stack.Navigator>
    );


}

export default SupervisorHomeStack;