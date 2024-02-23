import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HousekeeperHome from "../screens/Housekeeper/HousekeeperHome";
import HousekeeperProfile from "../screens/Housekeeper/HousekeeperProfile";
import HousekeeperRequest from "../screens/Housekeeper/HousekeeperRequest";
import { View, StyleSheet, Text } from "react-native";
import HomeIcon from "../SVG/HomeIcon";
import ProfileIcon from "../SVG/ProfileIcon";
import CartIcon from "../SVG/CartIcon";
import HousekeeperTest from "../screens/Housekeeper/HousekeeperTest";

const Tab = createBottomTabNavigator();
const NavigationTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#F89C7B",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          height: 50,
        },
        tabBarShowLabel: false, // This hides the label
        headerShown: false, // This removes the top app bar
      }}
    >
      <Tab.Screen
        name="Home"
        component={HousekeeperHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      borderRadius: 30,
                      borderWidth: 1,
                      borderColor: "#F89C7B",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
              <HomeIcon
                fill={focused ? "#FECE8C" : "none"}
                stroke={focused ? "#FECE8C" : "white"}
                h={focused ? 26 : 22}
                w={focused ? 29 : 25}
              ></HomeIcon>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Request"
        component={HousekeeperRequest}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      borderRadius: 30,
                      borderWidth: 1,
                      borderColor: "#F89C7B",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
              <CartIcon
                fill={focused ? "#FECE8C" : "none"}
                stroke={focused ? "#FECE8C" : "white"}
                h={focused ? 26 : 22}
                w={focused ? 29 : 25}
              ></CartIcon>

              <View
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
                  3 {/* Dynamic badge count */}
                </Text>
              </View>
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
        name="Profile"
        component={HousekeeperProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      borderRadius: 30,
                      borderWidth: 1,
                      borderColor: "#F89C7B",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
              <ProfileIcon
                fill={focused ? "#FF0000" : "none"}
                stroke={focused ? "#FECE8C" : "white"}
                h={focused ? 26 : 22}
                w={focused ? 29 : 25}
              ></ProfileIcon>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="HousekeeperTest"
        component={HousekeeperTest}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      borderRadius: 30,
                      borderWidth: 1,
                      borderColor: "#F89C7B",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
              <HomeIcon
                fill={focused ? "#FECE8C" : "none"}
                stroke={focused ? "#FECE8C" : "white"}
                h={focused ? 26 : 22}
                w={focused ? 29 : 25}
              ></HomeIcon>
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

export default NavigationTab;