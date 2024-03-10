import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MGRoomHeader from "../../components/MGRoomHeader/MGRoomHeader";
import SupervisorRoomDetail from "./SupervisorRoomDetail";

const SupervisorRoom = () => {
  const staff = [
    { value: "John Doe", key: "001" },
    { value: "Jane Smith", key: "002" },
    { value: "Michael Johnson", key: "003" },
    { value: "Emily Brown", key: "004" },
    { value: "David Wilson", key: "005" }
  ]

  const onPressHandler = () => {
    console.log('its been pressed')
  }
  return (
    <View style={styles.container}>
      <MGRoomHeader />
      <SupervisorRoomDetail staff={staff} onPress={onPressHandler()}/>
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
