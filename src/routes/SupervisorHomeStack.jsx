import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SupervisorHome from '../screens/Supervisor/SupervisorHome';



const Stack = createNativeStackNavigator();
const SupervisorHomeStack = () => {


    return (
        <Stack.Navigator>
        <Stack.Screen
            name="SupervisorHome"
            component={SupervisorHome}
            options={{
            headerShown: false,
            }}
        />
        </Stack.Navigator>
    );
    };

export default SupervisorHomeStack;
