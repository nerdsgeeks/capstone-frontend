import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import BedIcon from "../../SVG/BedIcon";
import { useTestStore } from "./../../store/testStore";
import BigButton from "../../components/BigButton/BigButton";
import { colors } from "../../../themes/themes";
import RequestDetail from "../Request/RequestDetail";

export function BearCounter() {
  const bears = useTestStore((state) => state.bears);
  return <Text>{bears} bears around here...</Text>;
}

// Controls component
export function Controls() {
  const increasePopulation = useTestStore((state) => state.increasePopulation);

  return <Button onPress={increasePopulation} title="one up" />;
}

const request = {
  date: "2021-09-24",
  itemType: "pillow",
  roomNumber: "A123",
  requester: "John Doe",
  requesterId: "12345",
  comments: "I need a pillow",
}

const SupervisorTest = () => {
  return (
    <View style={styles.container}>
      <Text>SupervisorTest Screen</Text>
      <BedIcon></BedIcon>
      <BigButton
        name="bark bark"
        icon={<BedIcon w="40" h="28" fill={colors.orange} />}
      />

      <BearCounter />
      <RequestDetail request={request} />
      <Controls />
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

export default SupervisorTest;
