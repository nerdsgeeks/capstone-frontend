import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Text } from "react-native";
import HomeIcon from "../SVG/HomeIcon";
import ProfileIcon from "../SVG/ProfileIcon";
import CartIcon from "../SVG/CartIcon";
import BedIcon from "../SVG/BedIcon";
import PersonIcon from "../SVG/PersonIcon";
import SupervisorHome from "../screens/Supervisor/SupervisorHome";
import SupervisorProfile from "../screens/Supervisor/SupervisorProfile";
import SupervisorRequest from "../screens/Supervisor/SupervisorRequest";
import SupervisorRoom from "../screens/Supervisor/SupervisorRoom";
import SupervisorStaff from "../screens/Supervisor/SupervisorStaff";
import SupervisorTest from "../screens/Supervisor/SupervisorTest";
import RequestIcon from "../SVG/RequestIcon";
import SupervisorHomeStack from "../routes/SupervisorHomeStack";
import SupervisorRequestStack from "../routes/SupervisorRequestStack";
import SupervisorRoomStack from "../routes/SupervisorRoomStack";
import { colors } from "../../themes/themes";
import SupervisorTestStack from "../routes/SupervisorTestStack";
import BedIconOutline from "../SVG/RoomIconOutline";

const Tab = createBottomTabNavigator();
const NavigationTabSupervisor = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          overflow: "hidden",
          paddingTop: 20, // Adjust padding top

          borderWidth: 1,
          borderColor: colors.n20,
          shadowColor: colors.n50,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="SupervisorHomeStack"
        component={SupervisorHomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <HomeIcon
                fill={focused ? colors.main : "none"}
                stroke={focused ? colors.main : colors.n30}
                h="30"
                w="33.25"
              ></HomeIcon>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="SupervisorRoomStack"
        component={SupervisorRoomStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <BedIcon
                  fill={colors.main}
                  stroke={colors.main}
                  h="30"
                  w="40"
                ></BedIcon>
              ) : (
                <BedIconOutline />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="SupervisorRequestStack"
        component={SupervisorRequestStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <RequestIcon
                fill={focused ? colors.main : "none"}
                stroke={focused ? colors.main : colors.n30}
                h="30"
                w="40"
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="SupervisorStaff"
        component={SupervisorStaff}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <PersonIcon
                fill={focused ? colors.main : "none"}
                stroke={focused ? colors.main : colors.n30}
                h="32.67"
                w="20.16"
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "10px",
  },
});

export default NavigationTabSupervisor;
