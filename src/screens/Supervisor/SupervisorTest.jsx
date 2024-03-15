import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import BedIcon from "../../SVG/BedIcon";
import { useTestStore } from "./../../store/testStore";
import InspectionReview from "./InspectionReview";
import useBaseUrl from "../../hooks/useBaseUrl";
import SupervisorRequestHistory from "./SupervisorRequestHistory";
import axios from "axios";

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
  // console.log(process.env);
  // const baseUrl = "http://10.0.2.2:5000";
  const request = {
    date: "2021-09-24",
    itemType: "pillow",
    roomNumber: "A123",
    requester: "John Doe",
    requesterId: "12345",
    comments: "I need a pillow",
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(baseUrl);
    const apiUrl = baseUrl + "/api/items/all";

    console.log(baseUrl + "/api/items/all");
    const onFetchItems = () =>
      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          setItems(data);
        })
        .catch((error) => {
          console.log(error);
        });

    onFetchItems();
  }, []);

  return (
    <View style={styles.container}>
      <Text>SupervisorTest Screen</Text>
      {/* <InspectionReview /> */}
      {items && (
        <ScrollView style={styles.scrollViewcontainer}>
          <View style={styles.row}>
            <Text style={styles.header}>Item Name</Text>
            <Text style={styles.header}>Available</Text>
            <Text style={styles.header}>Type</Text>
          </View>
          {items.map((item) => (
            <View key={item.ID} style={styles.row}>
              <Text style={styles.cell}>{item.ItemName}</Text>
              <Text style={styles.cell}>{item.AvailableNum}</Text>
              <Text style={styles.cell}>{item.ItemType}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#8fcbbc",
    // alignItems: "center",
    // justifyContent: "center",
  },
  scrollViewcontainer: {
    flex: 1,
    height: 400,
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
