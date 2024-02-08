import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import TestModal from "./TestModal";

const App = () => {
  return (
    <View style={styles.container}>
      <TestModal />
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
