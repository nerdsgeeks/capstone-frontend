import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Chip } from "react-native-paper";
import NavTabs from "../../components/NavTabs/NavTabs";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../../themes/themes";
import Accordion from "../../components/Accordion/Accordion";
import axios from "axios";
import useBaseUrl from "../../hooks/useBaseUrl";
import InformationIcon from "../../SVG/InformationIcon";
import SupervisorInformationModal from "../../components/SupervisorInformationModal/SupervisorInformationModal";

const SupervisorRoomMain = ({ onPressRoomDetail }) => {
  const [roomToDisplay, setRoomToDisplay] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [activeChip, setActiveChip] = useState("All");
  const [rooms, setRooms] = useState([]);
  const [isInformationModalOpen, setInformationModalOpen] = useState(false);

  const displayInformation = () => {
    setInformationModalOpen(true);
  };

  const toggleInformationModal = () => {
    setInformationModalOpen(!isInformationModalOpen);
  };

  const baseUrl = useBaseUrl();

  useEffect(() => {
    axios.get(`${baseUrl}/api/assignedRooms/all`).then((res) => {
      setRooms(res.data);
      console.log(res.data);
      setRoomToDisplay(res.data);
    });
  }, []);
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
      filteredRooms = rooms.filter((room) => room.Rooms_RoomStatus === status);
    }
    setRoomToDisplay(filteredRooms);
    setActiveChip(status);
  };
  const handleTabPress = (index) => {
    let statusRooms = [];
    let status = tabs[index].label;
    console.log(status);
    //there are 3 status In Progress , To Do, Completed
    if (status === "Pending") {
      statusRooms = roomToDisplay.filter(
        (room) => room.cleaningStatus === "In Progress",
      );
    } else if (status === "Cleaned") {
      statusRooms = roomToDisplay.filter(
        (room) => room.cleaningStatus === "To Do",
      );
    } else if (status === "Approved") {
      statusRooms = roomToDisplay.filter(
        (room) => room.cleaningStatus === "Completed",
      );
    }
    setRoomToDisplay(statusRooms);
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
                  activeChip === "DueIn" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "DueIn" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomStatus("DueIn")}
          >
            Due In
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "DueOut" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "DueOut" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomStatus("DueOut")}
          >
            Due Out
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "CheckedIn" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "CheckedIn" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomStatus("CheckedIn")}
          >
            Checked In
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "CheckedOut" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "CheckedOut" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomStatus("CheckedOut")}
          >
            Checked Out
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "DueOut-DueIn" ? colors.n40 : colors.n0,
              },
            ]}
            textStyle={{
              color: activeChip === "DueOut-DueIn" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomStatus("DueOut-DueIn")}
          >
            DueOut-DueIn
          </Chip>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeChip === "CheckedOut-CheckedIn"
                    ? colors.n40
                    : colors.n0,
              },
            ]}
            textStyle={{
              color:
                activeChip === "CheckedOut-CheckedIn" ? colors.n0 : colors.n40,
            }}
            onPress={() => setRoomStatus("CheckedOut-CheckedIn")}
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
            <TouchableOpacity onPress={displayInformation} style={{ justifySelf: "flex-end"}}>
              <InformationIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.floorAccordion}>
            <View style={{ width: "100%" }}>
              <Accordion
                rooms={roomToDisplay}
                onPressRoomDetail={onPressRoomDetail}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {isInformationModalOpen && (
        <SupervisorInformationModal
          isInformationModalOpen={isInformationModalOpen}
          toggleInformationModal={toggleInformationModal}
        />
      )}
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
