import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTab from "./Navigation/NavigationTab";
import RoomDetailHeader from "./components/RoomDetailHeader/RoomDetailHeader";

const App = () => {
  handleClick = () => {
    console.log("Button clicked");
  };

  const room = {
    type: 'Suite',
    number: 'A204',
    status: 'checkedIn',
  }

  return (
    <NavigationContainer>
      <RoomDetailHeader room={room} taskStatus="Pending"/>
    </NavigationContainer>
  );
};

export default App;
