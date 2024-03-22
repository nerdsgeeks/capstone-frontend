import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HousekeeperHome from "../screens/Housekeeper/HousekeeperHome";
import HousekeeperProfile from "../screens/Housekeeper/HousekeeperProfile";
import HousekeeperRequest from "../screens/Housekeeper/HousekeeperRequest";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import HomeIcon from "../SVG/HomeIcon";
import ProfileIcon from "../SVG/ProfileIcon";
import CartIcon from "../SVG/CartIcon";
import HousekeeperTest from "../screens/Housekeeper/HousekeeperTest";
import HousekeeperHomeStack from "../routes/HousekeeperHomeStack";
import HousekeeperRequestStack from "../routes/HousekeeperRequestStack";

const Tab = createBottomTabNavigator();
const NavigationTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          // backgroundColor: "#F89C7B",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          height: 52,
        },
        tabBarShowLabel: false, // This hides the label
        headerShown: false, // This removes the top app bar
      }}
    >
      <Tab.Screen
        name="HousekeeperHomeStack"
        component={HousekeeperHomeStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? {
                      // backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      // borderRadius: 30,
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
          tabBarStyle: {
            display: getTabBarVisibility(route) ? "none" : "flex",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            height: 52,
          },
        })}
      />

      <Tab.Screen
        name="HousekeeperRequestStack"
        component={HousekeeperRequestStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? {
                      //backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      //borderRadius: 30,
                      //borderWidth: 1,
                      borderColor: "#F89C7B",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
              <CartIcon
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
        name="Profile"
        component={HousekeeperProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? {
                      // backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      //borderRadius: 30,
                      //borderWidth: 1,
                      borderColor: "#F89C7B",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
              <ProfileIcon
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
        name="HousekeeperTest"
        component={HousekeeperTest}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? {
                      // backgroundColor: "#F89C7B",
                      height: 72,
                      width: 60,
                      //borderRadius: 30,
                      //borderWidth: 1,
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
    </Tab.Navigator>
  );
};
function getTabBarVisibility(route) {
  // You might need a more robust way to check the route name depending on your navigation structure
  const routeName = getFocusedRouteNameFromRoute(route) ?? "";
  return routeName === "Camera";
}

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
