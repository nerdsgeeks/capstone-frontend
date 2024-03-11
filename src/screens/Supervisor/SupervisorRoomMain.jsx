import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";
import NavTabs from "../../components/NavTabs/NavTabs";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../../themes/themes";
import Accordion from "../../components/Accordion/Accordion";
import RoomAccordionButton from "../../components/RoomAccordionButton/RoomAccordionButton";

const SupervisorRoomMain = ({ rooms, onPress }) => {
  const [roomToDisplay, setRoomToDisplay] = useState([]);
  const [activeChip, setActiveChip] = useState("All");
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Pending" },
    { label: "Cleaned" },
    { label: "Approved" },
  ];

  const setRoomStatus = (status) => {
    let filteredRooms = [];
    if (status === "All") {
        filteredRooms = rooms;
    } else {
        filteredRooms = rooms.filter((room) => room.RoomStatus === status);

    }

    setRoomToDisplay(filteredRooms);
    setActiveChip(status);
  };
  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ScrollView
          horizontal={true}
          style={[
            styles.chipContainer,
            { maxHeight: activeChip === "All" ? 60 : 44 },
          ]}
        >
          <Chip
            style={{
              backgroundColor: activeChip === "All" ? "#1E1E1E" : "#FFFFFF",
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              margin: 4,
            }}
            textStyle={{ color: activeChip === "All" ? "#FFFFFF" : "#9F9F9F" }}
            onPress={() => setRoomStatus("All")}
          >
            All
          </Chip>
          <Chip
            style={{
              backgroundColor: activeChip === "dueIn" ? "#1E1E1E" : "#FFFFFF",
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              margin: 4,
            }}
            textStyle={{
              color: activeChip === "dueIn" ? "#FFFFFF" : "#9F9F9F",
            }}
            onPress={() => setRoomStatus("dueIn")}
          >
            Due In
          </Chip>
          <Chip
            style={{
              backgroundColor: activeChip === "dueOut" ? "#1E1E1E" : "#FFFFFF",
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              margin: 4,
            }}
            textStyle={{
              color: activeChip === "dueOut" ? "#FFFFFF" : "#9F9F9F",
            }}
            onPress={() => setRoomStatus("dueOut")}
          >
            Due Out
          </Chip>
          <Chip
            style={{
              backgroundColor:
                activeChip === "checkedIn" ? "#1E1E1E" : "#FFFFFF",
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              margin: 4,
            }}
            textStyle={{
              color: activeChip === "checkedIn" ? "#FFFFFF" : "#9F9F9F",
            }}
            onPress={() => setRoomStatus("checkedIn")}
          >
            Checked In
          </Chip>
          <Chip
            style={{
              backgroundColor:
                activeChip === "checkedOut" ? "#1E1E1E" : "#FFFFFF",
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              margin: 4,
            }}
            textStyle={{
              color: activeChip === "checkedOut" ? "#FFFFFF" : "#9F9F9F",
            }}
            onPress={() => setRoomStatus("checkedOut")}
          >
            Checked Out
          </Chip>
          <Chip
            style={{
              backgroundColor:
                activeChip === "dueOutdueIn" ? "#1E1E1E" : "#FFFFFF",
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              margin: 4,
            }}
            textStyle={{
              color: activeChip === "dueOutdueIn" ? "#FFFFFF" : "#9F9F9F",
            }}
            onPress={() => setRoomStatus("dueOutdueIn")}
          >
            DueOut-DueIn
          </Chip>
          <Chip
            style={{
              backgroundColor:
                activeChip === "checkedOutcheckedIn" ? "#1E1E1E" : "#FFFFFF",
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              margin: 4,
            }}
            textStyle={{
              color: activeChip === "checkedOutcheckedIn" ? "#FFFFFF" : "#9F9F9F",
            }}
            onPress={() => setRoomStatus("checkedOutcheckedIn")}
          >
            CheckedOut-DueIn
          </Chip>
        </ScrollView>
      </View>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <View style={styles.filterNavAndTotalcontainer}>
            <View style={styles.borderContainer}>
              <Typography variant="small-medium" style={styles.totalTaskStyle}>
                20
              </Typography>
            </View>
            <NavTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabPress={handleTabPress}
              style={styles.NavContainer}
            />
          </View>
          <View style={styles.floorAccordion}>
            <View style={{ width: "90%" }}>
              <Accordion rooms={roomToDisplay} onPress={onPress} />
            </View>
          </View>
        </View>
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
    height: 60,
    marginLeft: 40,
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  filterNavAndTotalcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  NavContainer: {
    width: "100%",
    gap: 20,
  },
  borderContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderColor: colors.main,
    backgroundColor: colors.main,
    borderRadius: 20,
    padding: 5,
  },
  floorAccordion: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default SupervisorRoomMain;
