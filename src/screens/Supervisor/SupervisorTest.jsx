import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import BedIcon from "../../SVG/BedIcon";
import { useTestStore } from "./../../store/testStore";
import BigButton from "../../components/BigButton/BigButton";
import { colors } from "../../../themes/themes";
import RequestDetail from "../Request/RequestDetail";
import useBaseUrl from "../../hooks/useBaseUrl";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";

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
      <Text>SupervisorTest Screen</Text>
      <BedIcon></BedIcon>
      <BigButton
        name="bark bark"
        icon={<BedIcon w="40" h="28" fill={colors.orange} />}
      />

      <BearCounter />
      {/* <RequestDetail request={request} /> */}
      <Controls />
      <SupervisorRoomHeader room="Room 1" />


      {/* <ScrollView style={styles.scrollViewcontainer}>
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
      </ScrollView> */}
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
