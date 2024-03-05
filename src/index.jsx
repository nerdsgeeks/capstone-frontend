// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import NavigationTab from "./Navigation/NavigationTab";
// import * as Font from "expo-font";
// import AppLoading from "expo-app-loading";

// const App = () => {
//   const [isFontLoaded, setIsFontLoaded] = React.useState(false);

//   useEffect(() => {
//     async function loadFonts() {
//       await Font.loadAsync({
//         SatoshiBlack: require("./../assets/fonts/SatoshiBlack.otf"),
//         SatoshiMedium: require("./../assets/fonts/SatoshiMedium.otf"),
//         SatoshiRegular: require("./../assets/fonts/SatoshiRegular.otf"),
//       });
//       setIsFontLoaded(true);
//     }
//     loadFonts();
//   }, []);

//   if (!isFontLoaded) {
//     return <AppLoading />; // Show loading screen while fonts are loading
//   }

//   return (
//     <NavigationContainer>
//       <NavigationTab />
//     </NavigationContainer>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import NavigationTab from "./Navigation/NavigationTab";
import NavigationTabSupervisor from "./Navigation/NavigationTabSupervisor";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const [isFontLoaded, setIsFontLoaded] = React.useState(false);
  const [showHousekeeperDashboard, setShowHousekeeperDashboard] =
    useState(false);
  const [showSupervisorDashboard, setShowSupervisorDashboard] = useState(false);
  const [isDashboardSelected, setIsDashboardSelected] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        SatoshiBlack: require("./../assets/fonts/SatoshiBlack.otf"),
        SatoshiMedium: require("./../assets/fonts/SatoshiMedium.otf"),
        SatoshiRegular: require("./../assets/fonts/SatoshiRegular.otf"),
      });
      setIsFontLoaded(true);
    }
    loadFonts();
  }, []);

  if (!isFontLoaded) {
    return <AppLoading />; // Show loading screen while fonts are loading
  }
  const handleHousekeeperDashboardClick = () => {
    setShowHousekeeperDashboard(!showHousekeeperDashboard);
    setIsDashboardSelected(!isDashboardSelected);
  };

  const handleSupervisorDashboardClick = () => {
    setShowSupervisorDashboard(!showSupervisorDashboard);
    setIsDashboardSelected(!isDashboardSelected);
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
        <>
      
          {!isDashboardSelected && (
            <View style={styles.container}>
              <Button
                title="Housekeeper Dashboard"
                onPress={handleHousekeeperDashboardClick}
              ></Button>
              <Button
                title="Supervisor Dashboard Dashboard"
                onPress={handleSupervisorDashboardClick}
              ></Button>
            </View>
          )}

          {showHousekeeperDashboard && (
            <NavigationContainer>
              <NavigationTab />
            </NavigationContainer>
          )}

          {showSupervisorDashboard && (
            <NavigationContainer>
              <NavigationTabSupervisor />
            </NavigationContainer>
          )}
             
        </>
        </SafeAreaView>
        </SafeAreaProvider>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#8fcbbc",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
  },
});

export default App;
