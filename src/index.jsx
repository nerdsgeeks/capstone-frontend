import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import TestModal from "./TestModal";
import Button from "./components/Button/Button";

const App = () => {
  handleClick = () => {
    console.log("Button clicked");
  };


  return (
    <View style={styles.container}>
      <TestModal />
      <Button name="Primary" type="secondary" onPress={handleClick} />
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
