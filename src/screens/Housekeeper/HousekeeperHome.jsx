import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HousekeeperHomeHeader from "../../components/HousekeeperHomeHeader/HousekeeperHomeHeader";
import AssignedRoomListItem from "../../components/AssignedRoom/AssignedRoomListItem";
import { Chip } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import NavTabs from "../../components/NavTabs/NavTabs";

const HousekeeperHome = ({ navigation }) => {
  const rooms = [
    {
      tier: "gold",
      type: "Suite",
      status: "dueOut",
      roomNumber: "101",
      date: "2023-04-01",
      isCompleted: true,
    },
    {
      tier: "silver",
      type: "King Bed",
      status: "dueOut",
      roomNumber: "102", // Assuming this should be a different room number
      date: "2023-04-01",
      isCompleted: true,
    },
    {
      tier: "diamond",
      type: "Queen Bed",
      status: "dueOut",
      roomNumber: "103", // Assuming this should be a different room number
      date: "2023-04-01",
      isCompleted: true,
    },
    {
      tier: "gold",
      type: "Double Bed",
      status: "dueIn",
      roomNumber: "104", // Assuming this should be a different room number
      date: "2023-04-01",
      isCompleted: true,
    },
    {
      tier: "gold",
      type: "Suite",
      status: "checkedOut",
      roomNumber: "105", // Assuming this should be a different room number
      date: "2023-04-01",
      isCompleted: true,
    },
    {
      tier: "gold",
      type: "King Bed",
      status: "checkedIn",
      roomNumber: "106", // Assuming this should be a different room number
      date: "2023-04-01",
      isCompleted: false,
    },
    {
      tier: "gold",
      type: "Queen Bed",
      status: "dueOutdueIn",
      roomNumber: "107", // Assuming this should be a different room number
      date: "2023-04-01",
      isCompleted: false,
    },
    {
      tier: "gold",
      type: "Double Bed",
      status: "checkedOutcheckedIn",
      roomNumber: "108", // Assuming this should be a different room number
      date: "2023-04-01",
      isCompleted: false,
    },
  ];

  const [roomToDisplay, setRoomToDisplay] = useState([]);
  const [activeChip, setActiveChip] = useState("All");

  useEffect(() => {
    const filteredRooms = rooms.filter((room) => room.isCompleted === false);
    setRoomToDisplay(filteredRooms);
  }, []);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [{ label: "To do" }, { label: "Completed" }];

  const setRoomTypeRooms = (type) => {
    if (type === "All") {
      const filteredRooms = rooms.filter((room) => room.isCompleted === false);
      setRoomToDisplay(filteredRooms);
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

  const handleTabPress = (index) => {
    setActiveTab(index);

    if (index === 0) {
      const filteredRooms = rooms.filter((room) => room.isCompleted === false);
      console.log(filteredRooms);
      setRoomToDisplay(filteredRooms);
    } else {
      const filteredRooms = rooms.filter((room) => room.isCompleted === true);
      console.log(filteredRooms);
      setRoomToDisplay(filteredRooms);
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
      <ScrollView
        horizontal={true}
        style={[
          styles.chipContainer,
          { maxHeight: activeChip === "All" ? 60 : 44 }, // Apply dynamic style inline
        ]}
      >
        <Chip
          style={{
            backgroundColor: activeChip === "All" ? "#1E1E1E" : "#FFFFFF",
            height: 30, // Set an appropriate height for chips
            justifyContent: "center",
            alignItems: "center",
            margin: 4,
          }}
          textStyle={{ color: activeChip === "All" ? "#FFFFFF" : "#9F9F9F" }} // Ensures text is white
          onPress={() => setRoomTypeRooms("All")}
        >
          All
        </Chip>

        <Chip
          style={{
            backgroundColor: activeChip === "Suite" ? "#1E1E1E" : "#FFFFFF",
            height: 30, // Set an appropriate height for chips
            justifyContent: "center",
            alignItems: "center",
            margin: 4,
          }}
          textStyle={{ color: activeChip === "Suite" ? "#FFFFFF" : "#9F9F9F" }} // Ensures text is white
          onPress={() => setRoomTypeRooms("Suite")}
        >
          Suite
        </Chip>

        <Chip
          style={{
            backgroundColor: activeChip === "King Bed" ? "#1E1E1E" : "#FFFFFF",
            height: 30, // Set an appropriate height for chips
            justifyContent: "center",
            alignItems: "center",
            margin: 4,
          }}
          textStyle={{
            color: activeChip === "King Bed" ? "#FFFFFF" : "#9F9F9F",
          }} // Ensures text is white
          onPress={() => setRoomTypeRooms("King Bed")}
        >
          King Bed
        </Chip>

        <Chip
          style={{
            backgroundColor: activeChip === "Queen Bed" ? "#1E1E1E" : "#FFFFFF",
            height: 30, // Set an appropriate height for chips
            justifyContent: "center",
            alignItems: "center",
            margin: 4,
          }}
          textStyle={{
            color: activeChip === "Queen Bed" ? "#FFFFFF" : "#9F9F9F",
          }} // Ensures text is white
          onPress={() => setRoomTypeRooms("Queen Bed")}
        >
          Queen Bed
        </Chip>

        <Chip
          style={{
            backgroundColor:
              activeChip === "Double Bed" ? "#1E1E1E" : "#FFFFFF",
            height: 30, // Set an appropriate height for chips
            justifyContent: "center",
            alignItems: "center",
            margin: 4,
          }}
          textStyle={{
            color: activeChip === "Double Bed" ? "#FFFFFF" : "#9F9F9F",
          }} // Ensures text is white
          onPress={() => setRoomTypeRooms("Double Bed")}
        >
          Double Bed
        </Chip>
      </ScrollView>
      <View style={styles.assignedRoomListContainer}>
        <View style={styles.NavTabContainer}>
          {/* <View
            style={{
              backgroundColor: "#FECE8C",
              borderRadius: 10,
              width: 20,
              height: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 12,
                right: -2,
              }}
            >
              3 
            </Text>
          </View> */}
          <NavTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabPress={handleTabPress}
          />
        </View>

        <ScrollView
          contentContainerStylecontentContainerStyle={
            styles.scrollViewAssignedRoomListContainerContent
          }
        >
          {roomToDisplay.map((room, index) => (
            <AssignedRoomListItem key={index} room={room} />
          ))}
        </ScrollView>
      </View>
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
    height: 60,
    marginLeft: 40,
    marginTop: 10,
  },
  assignedRoomListContainer: {
    flexDirection: "column",
    marginTop: 10,
    paddingHorizontal: 26,
    paddingVertical: 15,
    height: 510,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  NavTabContainer: {
    flexDirection: "column",
  },
  scrollViewAssignedRoomListContainerContent: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
});

export default HousekeeperHome;
