import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useTestStore } from "./../../store/testStore";
import InspectionReview from "./InspectionReview";
import useBaseUrl from "../../hooks/useBaseUrl";
import SupervisorRequestHistory from "./SupervisorRequestHistory";


export function BearCounter() {
  const bears = useTestStore((state) => state.bears);
  return <Text>{bears} bears around here...</Text>;
}

// Controls component
export function Controls() {
  const increasePopulation = useTestStore((state) => state.increasePopulation);

  return <Button onPress={increasePopulation} title="one up" />;
}

const SupervisorTest = () => {
  const baseUrl = useBaseUrl();
  const request = {
    date: "2021-09-24",
    itemType: "pillow",
    roomNumber: "A123",
    requester: "John Doe",
    requesterId: "12345",
    comments: "I need a pillow",
  };
  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl + "/api/items/all");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return [];
    }
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData().then(setItems);
  }, []);

  return (
    <View style={styles.container}>
      <SupervisorRequestHistory />
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
  scrollViewcontainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  header: {
    fontWeight: "bold",
    flex: 1,
  },
  cell: {
    flex: 1,
  },
});

export default SupervisorTest;
