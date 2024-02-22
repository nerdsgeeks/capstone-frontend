import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const HousekeeperProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>HousekeeperProfile Screen</Text>
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

export default HousekeeperProfile;
