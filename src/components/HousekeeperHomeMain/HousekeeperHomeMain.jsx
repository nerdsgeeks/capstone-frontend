import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AssignedRoomListItem from "../../components/AssignedRoom/AssignedRoomListItem";
import { Chip } from "react-native-paper";
import NavTabs from "../../components/NavTabs/NavTabs";
import Typography from "../../components/Typography/Typography";
import { useRoomDetailsStore, useRoomsStore } from "../../store/roomStore";
import { colors } from "../../../themes/themes";

const HousekeeperHomeMain = ({ rooms, items, navigation }) => {
  const [roomToDisplay, setRoomToDisplay] = useState([]);
  const [activeChip, setActiveChip] = useState("All");
  const [assignedRoomNumber, setAssignedRoomNumber] = useState(0);
  const roomDetailsStore = useRoomDetailsStore(
    (state) => state.roomDetailsStore,
  );
  const updateRoomDetailsStore = useRoomDetailsStore(
    (state) => state.updateRoomDetailsStore,
  );
  const roomsStore = useRoomsStore((state) => state.roomsStore);
  const updateRoomsStore = useRoomsStore((state) => state.updateRoomsStore);
  // console.log(" HousekeeperHomeMain rooms");
  // console.log(rooms);

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [{ label: "To do" }, { label: "Completed" }];
  // console.log("rooms");
  // console.log(rooms);

  const setRoomTypeRooms = (type) => {
    const today = new Date().toISOString().split("T")[0];
    let filteredRooms = [];

    if (activeTab === 0) {
      filteredRooms = rooms.filter(
        (room) => room.cleaningStatus.toUpperCase() !== "CLEANED",
      );
    } else {
      filteredRooms = rooms.filter(
        (room) => room.cleaningStatus.toUpperCase() === "CLEANED",
      );
    }

    if (type.toUpperCase() !== "All".toUpperCase()) {
      // console.log("room");
      // console.log(rooms);
      console.log("type");
      console.log(type);

      filteredRooms = filteredRooms.filter(
        (room) => room.roomTypeName.toUpperCase() === activeChip.toUpperCase(),
      );
    }

    console.log("filteredRooms");
    console.log(filteredRooms);
    setRoomToDisplay(filteredRooms);
    setAssignedRoomNumber(filteredRooms.length);
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
    let filteredRooms = [];

    if (index === 0) {
      filteredRooms = rooms.filter(
        (room) => room.cleaningStatus.toUpperCase() !== "CLEANED",
      );
    } else {
      filteredRooms = rooms.filter(
        (room) => room.cleaningStatus.toUpperCase() === "CLEANED",
      );
    }

    if (activeChip.toUpperCase() !== "All".toUpperCase()) {
      // console.log("room");
      // console.log(rooms);
      console.log("activeChip");
      console.log(activeChip);

      filteredRooms = filteredRooms.filter(
        (room) => room.roomTypeName.toUpperCase() === activeChip.toUpperCase(),
      );
    }

    console.log("filteredRooms");
    console.log(filteredRooms);
    setRoomToDisplay(filteredRooms);
    setAssignedRoomNumber(filteredRooms.length);
  };

  useEffect(() => {
    let filteredRooms = [];

    if (activeTab === 0) {
      filteredRooms = rooms.filter(
        (room) => room.cleaningStatus.toUpperCase() !== "CLEANED",
      );
    } else {
      filteredRooms = rooms.filter(
        (room) => room.cleaningStatus.toUpperCase() === "CLEANED",
      );
    }

    if (activeChip.toUpperCase() !== "All".toUpperCase()) {
      // console.log("room");
      // console.log(rooms);
      console.log("activeChip");
      console.log(activeChip);

      filteredRooms = filteredRooms.filter(
        (room) => room.roomTypeName.toUpperCase() === activeChip.toUpperCase(),
      );
    }

    console.log("filteredRooms");
    console.log(filteredRooms);
    setRoomToDisplay(filteredRooms);
    setAssignedRoomNumber(filteredRooms.length);
  }, [roomsStore]);

  return (
    <View style={styles.container}>
      <View>
        <ScrollView horizontal={true} style={[styles.chipContainer]}>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor: activeChip === "All" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "All" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomTypeRooms("All")}
          >
            <Typography variant="small-medium">All</Typography>
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "Suite" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "Suite" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomTypeRooms("Suite")}
          >
            <Typography variant="small-medium">Suite</Typography>
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "King Bed" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "King Bed" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomTypeRooms("King Bed")}
          >
            <Typography variant="small-medium">King Bed</Typography>
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "Queen Bed" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "Queen Bed" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomTypeRooms("Queen Bed")}
          >
            <Typography variant="small-medium">Queen Bed</Typography>
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "Double Bed" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "Double Bed" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomTypeRooms("Double Bed")}
          >
            <Typography variant="small-medium">Double Bed</Typography>
          </Chip>
        </ScrollView>
      </View>

      <View style={styles.assignedRoomListContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={{
              backgroundColor: colors.main,
              borderRadius: 20,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5-medium">{assignedRoomNumber}</Typography>
          </View>
          <NavTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabPress={handleTabPress}
          />
        </View>

        <ScrollView>
          {roomToDisplay.map((room, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                updateRoomDetailsStore(room);
                navigation.navigate("RoomDetail", {
                  roomDetails: room,
                  items: items,
                });
              }}
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
    backgroundColor: colors.n10,
  },
  chipContainer: {
    flexDirection: "row",
    marginLeft: 26,
    paddingVertical: 10,
  },
  chip: {
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderRadius: 20,
  },
  assignedRoomListContainer: {
    flexGrow: 1,
    gap:16,
    backgroundColor: colors.n0,
    flexDirection: "column",
    paddingHorizontal: 26,
    paddingVertical: 32,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 1,
    borderColor: colors.n20,
    paddingBottom: 100,
  },
});

export default HousekeeperHomeMain;
