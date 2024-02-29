import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTab from "./Navigation/NavigationTab";

const App = () => {
  const loadFonts = async () => {
    await Font.loadAsync({
      'SatoshiBlack': require('./../assets/fonts/SatoshiBlack.otf'),
      'SatoshiMedium': require('./../assets/fonts/SatoshiMedium.otf'),
      'SatoshiRegular': require('./../assets/fonts/SatoshiRegular.otf'),
    });
  }
  
  loadFonts();

  handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <NavigationContainer>
      <NavigationTab />
    </NavigationContainer>
  );
};

export default App;
