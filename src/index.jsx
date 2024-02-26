import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTab from "./Navigation/NavigationTab";
import InputField from "./components/InputField/inputField";

const App = () => {
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
