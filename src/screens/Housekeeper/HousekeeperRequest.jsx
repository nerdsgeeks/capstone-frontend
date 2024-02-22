import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const HousekeeperRequest = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>HousekeeperRequest Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fcbbc",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HousekeeperRequest;
