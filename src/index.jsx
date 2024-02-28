import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTab from "./Navigation/NavigationTab";
import InputField from "./components/InputField/inputField";
import Typography from "./components/Typography/Typography";
import * as Font from 'expo-font';

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
      <InputField icon="x"/>
    </NavigationContainer>
  );
};

export default App;
