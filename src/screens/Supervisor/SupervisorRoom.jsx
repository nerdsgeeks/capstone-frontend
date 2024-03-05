import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MGRoomHeader from "../../components/MGRoomHeader/MGRoomHeader";

const SupervisorRoom = () => {
  return (
    <View style={styles.container}>
      <MGRoomHeader/>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#8fcbbc",
    // alignItems: "center",
    justifyContent: "center",
  },
});

export default SupervisorRoom;
