import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const SupervisorStaff = () => {
  return (
    <View style={styles.container}>
      <Text>SupervisorStaff Screen</Text>
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

export default SupervisorStaff;
