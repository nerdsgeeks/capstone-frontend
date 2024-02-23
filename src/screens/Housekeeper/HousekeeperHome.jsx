import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import HousekeeperHomeHeader from "../../components/HousekeeperHomeHeader/HousekeeperHomeHeader";
import AssignedRoomListItem from "../../components/AssignedRoom/AssignedRoomListItem";
import { Chip, withTheme, lightColors } from "@rneui/themed";

const HousekeeperHome = ({ navigation }) => {
  const rooms = [
    {
      tier: "gold",
      type: "Suite",
      status: "dueOut",
      roomNumber: "101",
      date: "2023-04-01",
    },
    {
      tier: "silver",
      type: "King Bed",
      status: "dueOut",
      roomNumber: "102", // Assuming this should be a different room number
      date: "2023-04-01",
    },
    {
      tier: "diamond",
      type: "Queen Bed",
      status: "dueOut",
      roomNumber: "103", // Assuming this should be a different room number
      date: "2023-04-01",
    },
    {
      tier: "gold",
      type: "Double Bed",
      status: "dueIn",
      roomNumber: "104", // Assuming this should be a different room number
      date: "2023-04-01",
    },
    {
      tier: "gold",
      type: "Suite",
      status: "checkedOut",
      roomNumber: "105", // Assuming this should be a different room number
      date: "2023-04-01",
    },
    {
      tier: "gold",
      type: "King Bed",
      status: "checkedIn",
      roomNumber: "106", // Assuming this should be a different room number
      date: "2023-04-01",
    },
    {
      tier: "gold",
      type: "Queen Bed",
      status: "dueOutdueIn",
      roomNumber: "107", // Assuming this should be a different room number
      date: "2023-04-01",
    },
    {
      tier: "gold",
      type: "Double Bed",
      status: "checkedOutcheckedIn",
      roomNumber: "108", // Assuming this should be a different room number
      date: "2023-04-01",
    },
  ];

  const [roomToDisplay, setRoomToDisplay] = useState([]);
  const [activeChip, setActiveChip] = useState("All");

  useEffect(() => {
    setRoomToDisplay(rooms);
  }, []);

  const setRoomTypeRooms = (type) => {
    if (type === "All") {
      setRoomToDisplay(rooms);
    } else {
      const filteredRooms = rooms.filter((room) => room.type === type);
      console.log(filteredRooms);
      setRoomToDisplay(filteredRooms);
    }
    console.log("type: " + type);
    switch (type) {
      case "All":
        setActiveChip("All");
        break;
      case "Suite":
        setActiveChip("Suite");
        break;
      case "King Bed":
        setActiveChip("King Bed");
        break;
      case "Queen Bed":
        setActiveChip("Queen Bed");
        break;
      case "Double Bed":
        setActiveChip("Double Bed");
        break;
      default:
        setActiveChip("All");
    }
  };

  return (
    <View style={styles.container}>
      <HousekeeperHomeHeader
        name="Pujan"
        message="Time to shine at work!"
        taskProgress={0.4}
        scheduleTime="10:00-18:00"
      ></HousekeeperHomeHeader>

      <ScrollView horizontal={true} style={styles.chipContainer}>
        <Chip
          title="All"
          onPress={() => setRoomTypeRooms("All")}
          type="solid"
          containerStyle={{ marginVertical: 15 }}
          buttonStyle={{
            backgroundColor: activeChip === "All" ? "black" : "gray",
            width: 60,
          }}
        />

        <Chip
          title="Suite"
          onPress={() => setRoomTypeRooms("Suite")}
          type="solid"
          containerStyle={{ marginVertical: 15 }}
          buttonStyle={{
            backgroundColor: activeChip === "Suite" ? "black" : "gray",
            width: 80,
          }}
        />

        <Chip
          title="King Bed"
          onPress={() => setRoomTypeRooms("King Bed")}
          type="solid"
          containerStyle={{ marginVertical: 15 }}
          buttonStyle={{
            backgroundColor: activeChip === "King Bed" ? "black" : "gray",
            width: 100,
          }}
        />

        <Chip
          title="Queen Bed"
          onPress={() => setRoomTypeRooms("Queen Bed")}
          type="solid"
          containerStyle={{ marginVertical: 15 }}
          buttonStyle={{
            backgroundColor: activeChip === "Queen Bed" ? "black" : "gray",
            width: 100,
          }}
        />

        <Chip
          title="Double Bed"
          onPress={() => setRoomTypeRooms("Double Bed")}
          type="solid"
          containerStyle={{ marginVertical: 15 }}
          buttonStyle={{
            backgroundColor: activeChip === "Double Bed" ? "black" : "gray",
            width: 100,
          }}
        />
      </ScrollView>
      <ScrollView>
        {roomToDisplay.map((room, index) => (
          <AssignedRoomListItem key={index} room={room} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  chipContainer: {
    flexDirection: "row",
    height: 100,
    borderWidth: 2,
  },
});

export default HousekeeperHome;
