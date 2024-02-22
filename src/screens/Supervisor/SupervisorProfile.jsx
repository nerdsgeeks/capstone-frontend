import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const SupervisorProfile = () => {
  return (
    <View style={styles.container}>
      <Text>SupervisorProfile Screen</Text>
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

export default SupervisorProfile;
