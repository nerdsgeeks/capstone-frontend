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
import SupervisorTestStack from "../routes/SupervisorTestStack";

const Tab = createBottomTabNavigator();
const NavigationTabSupervisor = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          // backgroundColor: "#F89C7B",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          height: 50,
        },
        tabBarShowLabel: false, // This hides the label
        headerShown: false, // This removes the top app bar
      }}
    >
      <Tab.Screen
        name="SupervisorHomeStack"
        component={SupervisorHomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? {
                      // backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      borderRadius: 30,
                      // borderWidth: 1,
                      borderColor: "#F89C7B",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
              <HomeIcon
                fill={focused ? "#FECE8C" : "black"}
                stroke={focused ? "#FECE8C" : "black"}
                h={focused ? 26 : 22}
                w={focused ? 29 : 25}
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
            <View
              style={
                focused
                  ? {
                      // backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      borderRadius: 30,
                      // borderWidth: 1,
                      borderColor: "#F89C7B",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
              <BedIcon
                fill={focused ? "#FECE8C" : "black"}
                stroke={focused ? "#FECE8C" : "black"}
                h={focused ? 26 : 22}
                w={focused ? 29 : 25}
              ></BedIcon>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="SupervisorRequestStack"
        component={SupervisorRequestStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? {
                      // backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      borderRadius: 30,
                      // borderWidth: 1,
                      borderColor: "#F89C7B",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
              <RequestIcon
                fill={focused ? "#FECE8C" : "black"}
                stroke={focused ? "#FECE8C" : "black"}
                h={focused ? 26 : 22}
                w={focused ? 29 : 25}
              />

              {/* <View
                style={
                  focused
                    ? {
                        position: "absolute",
                        right: 10,
                        top: -9,
                        backgroundColor: "#FECE8C",
                        borderRadius: 10,
                        width: 20,
                        height: 20,
                        justifyContent: "center",
                        alignItems: "center",
                      }
                    : {
                        position: "absolute",
                        right: -10,
                        top: -24,
                        backgroundColor: "#FECE8C",
                        borderRadius: 10,
                        width: 20,
                        height: 20,
                        justifyContent: "center",
                        alignItems: "center",
                      }
                }
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 12,
                    right: -2,
                  }}
                >
                  3 
                </Text>
              </View> */}
            </View>
          ),
          //   tabBarBadge: 3,
          //   tabBarBadgeStyle: {
          //     backgroundColor: "#FECE8C", // Set badge background color
          //     color: "#000", // Set badge text color
          //     fontSize: 12, // Set badge text size
          //     height: 20,
          //     width: 20,
          //     top: -10,
          //   },
        }}
      />

      <Tab.Screen
        name="SupervisorStaff"
        component={SupervisorStaff}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? {
                      // backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      borderRadius: 30,
                      // borderWidth: 1,
                      borderColor: "#F89C7B",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
              <PersonIcon
                fill={focused ? "#FECE8C" : "black"}
                stroke={focused ? "#FECE8C" : "black"}
                h={focused ? 26 : 22}
                w={focused ? 29 : 25}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="SupervisorTestStack"
        component={SupervisorTestStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? {
                      // backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      borderRadius: 30,
                      // borderWidth: 1,
                      borderColor: "#F89C7B",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
              <ProfileIcon
                fill={focused ? "#FF0000" : "black"}
                stroke={focused ? "#FECE8C" : "black"}
                h={focused ? 26 : 22}
                w={focused ? 29 : 25}
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
