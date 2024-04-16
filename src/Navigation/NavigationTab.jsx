import React, { useState, useEffect } from "react";
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
import LoadingScreen from "../screens/LoadingScreen";

const Tab = createBottomTabNavigator();

const NavigationTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          overflow: "hidden",
          zIndex: 1,
          // height: 52,
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
        name="HousekeeperHomeStack"
        component={HousekeeperHomeStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <View>
              <HomeIcon
                fill={focused ? colors.main : "none"}
                stroke={focused ? colors.main : colors.n30}
                h="30"
                w="33.25"
              />
            </View>
          ),
          tabBarStyle: {
            display: getTabBarVisibility(route) ? "none" : "flex",

            paddingVertical: 24,
          },
        })}
      />

      <Tab.Screen
        name="HousekeeperRequestStack"
        component={HousekeeperRequestStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{}}>
              {focused ? (
                <NewCartIcon w="37.8" h="35" />
              ) : (
                <NewCartIconOutline w="37.8" h="35" />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={HousekeeperPerformanceStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
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

function getTabBarVisibility(route) {
  // You might need a more robust way to check the route name depending on your navigation structure
  const routeName = getFocusedRouteNameFromRoute(route) ?? "";
  return (
    routeName === "RoomDetail" ||
    routeName === "RequestItemSupplies" ||
    routeName === "RequestItemSuppliesOrder" ||
    routeName === "Camera" ||
    routeName === "StaffCleanedRoomScreen"
  );
}

export default NavigationTab;
