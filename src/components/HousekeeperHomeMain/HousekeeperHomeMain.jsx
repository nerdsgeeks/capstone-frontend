import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import HousekeeperHomeHeader from "../../components/HousekeeperHomeHeader/HousekeeperHomeHeader";
import AssignedRoomListItem from "../../components/AssignedRoom/AssignedRoomListItem";
import { Chip } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import NavTabs from "../../components/NavTabs/NavTabs";
import Typography from "../../components/Typography/Typography";
import RoomDetail from "../../screens/RoomDetail/RoomDetail";

const HousekeeperHomeMain = ({ rooms, navigation }) => {
  const [roomToDisplay, setRoomToDisplay] = useState([]);
  const [activeChip, setActiveChip] = useState("All");
  const [assignedRoomNumber, setAssignedRoomNumber] = useState(0);

  useEffect(() => {
    const filteredRooms = rooms.filter((room) => room.isCompleted === false);
    setRoomToDisplay(filteredRooms);
    setAssignedRoomNumber(filteredRooms.length);
  }, []);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [{ label: "To do" }, { label: "Completed" }];

  const setRoomTypeRooms = (type) => {
    if (type === "All") {
      const filteredRooms = rooms.filter((room) => room.isCompleted === false);
      setRoomToDisplay(filteredRooms);
      setAssignedRoomNumber(filteredRooms.length);
    } else {
      const filteredRooms = rooms.filter((room) => room.type === type);
      console.log(filteredRooms);
      setRoomToDisplay(filteredRooms);
      setAssignedRoomNumber(filteredRooms.length);
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
      setAssignedRoomNumber(filteredRooms.length);
    } else {
      const filteredRooms = rooms.filter((room) => room.isCompleted === true);
      console.log(filteredRooms);
      setRoomToDisplay(filteredRooms);
      setAssignedRoomNumber(filteredRooms.length);
    }
  };

  return (
    <View style={styles.container}>
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
        <View style={styles.NavTabRowContainer}>
          <View
            style={{
              backgroundColor: "#F89C7B",
              borderRadius: 20,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body-regular"
              style={{
                color: "#000",
                fontSize: 18,
                // right: -2,
              }}
            >
              {assignedRoomNumber}
            </Typography>
          </View>
          <View style={styles.NavTabContainer}>
            <NavTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabPress={handleTabPress}
            />
          </View>
        </View>

        <ScrollView
          contentContainerStylecontentContainerStyle={
            styles.scrollViewAssignedRoomListContainerContent
          }
        >
          {roomToDisplay.map((room, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("RoomDetail", { roomDetails: room })
              }
            >
              <AssignedRoomListItem room={room} />
            </TouchableOpacity>
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
    paddingLeft: 26,
    paddingVertical: 15,
    height: 510,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  NavTabRowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollViewAssignedRoomListContainerContent: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  NavTabContainer: {
    // borderColor: "black",
    // borderWidth: 1,
  },
});

export default HousekeeperHomeMain;
