import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SupervisorHome from '../screens/Supervisor/SupervisorHome';
import SupervisorRoom from '../screens/Supervisor/SupervisorRoom';
import SupervisorRequest from '../screens/Supervisor/SupervisorRequest';
import SupervisorStaff from '../screens/Supervisor/SupervisorStaff';



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
        <Stack.Screen
            name="SupervisorRoom"
            component={SupervisorRoom}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="SupervisorRequest"
            component={SupervisorRequest}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="SupervisorStaff"
            component={SupervisorStaff}
            options={{
            headerShown: false,
            }}
        />
        </Stack.Navigator>
    );
    };

export default SupervisorHomeStack;
