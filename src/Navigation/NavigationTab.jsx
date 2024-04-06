import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import HomeIcon from "../SVG/HomeIcon";
import ProfileIcon from "../SVG/ProfileIcon";
import CartIcon from "../SVG/CartIcon";
import HousekeeperHomeStack from "../routes/HousekeeperHomeStack";
import HousekeeperRequestStack from "../routes/HousekeeperRequestStack";
import HousekeeperPerformanceStack from "../routes/HousekeeperPerformanceStack";
import { colors } from "../../themes/themes";
import NewCartIcon from "../SVG/NewCartIcon";
import NewCartIconOutline from "../SVG/NewCartIconOutline";

const Tab = createBottomTabNavigator();

const NavigationTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          overflow: "hidden",
          paddingTop: 20, // Adjust padding top
          borderTopLeftRadius: 20, // Add border radius
          borderTopRightRadius: 20,
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
        name="HousekeeperHomeStack"
        component={HousekeeperHomeStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <View
            // style={{
            //   height: 72,
            //   width: 60,
            //   borderColor: "#F89C7B",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
            >
              <HomeIcon
                fill={focused ? colors.main : "none"}
                stroke={focused ? colors.main : colors.n30}
                h="30"
                w="33.25"
              />
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="HousekeeperRequestStack"
        component={HousekeeperRequestStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                {
                  // height: 72,
                  // width: 60,
                  // borderColor: "#F89C7B",
                  // justifyContent: "center",
                  // alignItems: "center",
                }
              }
            >
              {focused ? (
                <NewCartIcon w="37.8" h="35" />
              ) : (
                <NewCartIconOutline  w="37.8" h="35"/>
              )}
              {/* <CartIcon
                fill={focused ? colors.main : "none"}
                stroke={focused ? colors.main : colors.n30}
                h="28"
                w="30.72"
              /> */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={HousekeeperPerformanceStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
            // style={{
            //   height: 72,
            //   width: 60,
            //   borderColor: "#F89C7B",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
            >
              <ProfileIcon
                fill={focused ? colors.main : "none"}
                stroke={focused ? colors.main : colors.n30}
                h="28"
                w="28"
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationTab;
