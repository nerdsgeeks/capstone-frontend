import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTab from "./Navigation/NavigationTab";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const App = () => {
  const [isFontLoaded, setIsFontLoaded] = React.useState(false);

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

  return (
    <NavigationContainer>
      <NavigationTab />
    </NavigationContainer>
  );
};

export default App;
