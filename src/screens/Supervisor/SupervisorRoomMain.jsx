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
            style={[
              styles.chip,
              {
                backgroundColor: activeChip === "All" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{ color: activeChip === "All" ? colors.n0 : colors.n40 }}
            onPress={() => setRoomStatus("All")}
          >
            All
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "dueIn" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "dueIn" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomStatus("dueIn")}
          >
            Due In
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "dueOut" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "dueOut" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomStatus("dueOut")}
          >
            Due Out
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "checkedIn" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "checkedIn" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomStatus("checkedIn")}
          >
            Checked In
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "checkedOut" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "checkedOut" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomStatus("checkedOut")}
          >
            Checked Out
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "dueOutdueIn" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "dueOutdueIn" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomStatus("dueOutdueIn")}
          >
            DueOut-DueIn
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "checkedOutcheckedIn" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color:
                activeChip === "checkedOutcheckedIn" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomStatus("checkedOutcheckedIn")}
          >
            CheckedOut-DueIn
          </Chip>
        </ScrollView>
      </View>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 27,
              gap: 8,
            }}
          >
            <View style={styles.numberContainer}>
              <Typography variant="small-medium">20</Typography>
            </View>
            <NavTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabPress={handleTabPress}
              style={styles.NavContainer}
            />
          </View>
          <View style={styles.floorAccordion}>
            <View style={{ width: "100%" }}>
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
    backgroundColor: colors.n0,
  },
  chipContainer: {
    flexDirection: "row",
    marginLeft: 27,
    marginVertical: 10,
  },
  chip: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderRadius: 20,
  },
  headerContainer: {
    backgroundColor: colors.n10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  numberContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: colors.main,
    borderRadius: 100,
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
