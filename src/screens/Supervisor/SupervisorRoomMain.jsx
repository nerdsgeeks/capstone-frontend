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
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";
import { useFocusEffect } from "@react-navigation/native";

const SupervisorRoomMain = ({ onPressRoomDetail }) => {
  const [roomToDisplay, setRoomToDisplay] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [activeChip, setActiveChip] = useState("All");
  const [displayRoomAfterFilter, setDisplayRoomAfterFilter] = useState([]);

  const [rooms, setRooms] = useState([]);

  const baseUrl = useBaseUrl();

  const accessTokenStore = useAccessTokenStore(
    (state) => state.accessTokenStore,
  );
  const updateAccessTokenStore = useAccessTokenStore(
    (state) => state.updateAccessTokenStore,
  );

  const employeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.employeeDetailsStore,
  );
  const updateEmployeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.updateEmployeeDetailsStore,
  );

  // useEffect(() => {
  //   fetchRooms().then((data) => {
  //     const localDate = new Date();
  //     const today =
  //       localDate.getFullYear() +
  //       "-" +
  //       String(localDate.getMonth() + 1).padStart(2, "0") +
  //       "-" +
  //       String(localDate.getDate()).padStart(2, "0");
  //     const filteredRooms = data.filter(
  //       (room) =>
  //         room.assignedDateTime && room.assignedDateTime.startsWith(today),
  //     );
  //     setRooms(filteredRooms);
  //     setDisplayRoomAfterFilter(filteredRooms);
  //   });
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchRooms().then((data) => {
        const localDate = new Date();
        const today =
          localDate.getFullYear() +
          "-" +
          String(localDate.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(localDate.getDate()).padStart(2, "0");
        const filteredRooms = data.filter(
          (room) =>
            room.assignedDateTime && room.assignedDateTime.startsWith(today),
        );
        setRooms(filteredRooms);
        setDisplayRoomAfterFilter(filteredRooms);
      });

      // Return a no-op function if no clean-up is needed
      return () => {};
    }, []),
  );

  const fetchRooms = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessTokenStore}`,
        },
      };
      const response = await axios.get(
        `${baseUrl}/api/assignedRooms/all`,
        config,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  };
  const tabs = [
    { label: "Pending" },
    { label: "Cleaned" },
    { label: "Approved" },
  ];

  const setRoomStatus = (status, activeTab) => {
    let filteredRooms = [];
    if (status === "All") {
      filteredRooms = rooms;
    } else {
      filteredRooms = rooms.filter(
        (room) => room.RoomStatus.toUpperCase() === status.toUpperCase(),
      );
    }

    console.log("activeTab", activeTab);
    displayFilterWithTabPress(activeTab, filteredRooms);
    setActiveChip(status);
  };

  const calculateRoomCount = (status) => {
    if (status === "Pending") {
      return rooms.filter(
        (room) =>
          room.cleaningStatus === "In Progress" ||
          room.cleaningStatus === "To Do",
      ).length;
    } else if (status === "Cleaned") {
      return rooms.filter((room) => room.cleaningStatus === "Cleaned").length;
    } else if (status === "Approved") {
      return rooms.filter((room) => room.cleaningStatus === "Approved").length;
    }
    return 0;
  };

  const displayFilterWithTabPress = (index, rooms) => {
    compareValue = tabs[index].label;
    console.log(compareValue);
    let statusRooms = [];

    if (compareValue === "Pending") {
      statusRooms = rooms.filter((room) => room.cleaningStatus === "To Do");
    } else if (compareValue === "Cleaned") {
      console.log("Cleaned");
      statusRooms = rooms.filter((room) => room.cleaningStatus === "Cleaned");
      console.log("statusRooms", statusRooms);
    } else if (compareValue === "Approved") {
      statusRooms = rooms.filter((room) => room.cleaningStatus === "Approved");
    }
    setDisplayRoomAfterFilter(statusRooms);
  };
  const handleTabPress = (activeTab) => {
    setActiveTab(activeTab);
    setRoomStatus(activeChip, activeTab);
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
            onPress={() => setRoomStatus("All", activeTab)}
          >
            <Typography variant="body-medium">All</Typography>
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
            onPress={() => setRoomStatus("DueIn", activeTab)}
          >
            <Typography variant="body-medium">Due In</Typography>
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
            onPress={() => setRoomStatus("DueOut", activeTab)}
          >
            <Typography variant="body-medium">Due Out</Typography>
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
            onPress={() => setRoomStatus("CheckedIn", activeTab)}
          >
            <Typography variant="body-medium">Checked In</Typography>
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
            onPress={() => setRoomStatus("CheckedOut", activeTab)}
          >
            <Typography variant="body-medium">Checked Out</Typography>
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
            onPress={() => setRoomStatus("DueOut-DueIn", activeTab)}
          >
            <Typography variant="body-medium">Due In - Due Out</Typography>
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
            onPress={() => setRoomStatus("CheckedOut-CheckedIn", activeTab)}
          >
            <Typography variant="body-medium">
              Checked In - Checked Out
            </Typography>
          </Chip>
        </ScrollView>
      </View>

      <View style={styles.bodyContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 27,
            gap: 8,
          }}
        >
          <View style={styles.numberContainer}>
            <Typography variant="h5-medium">
              {calculateRoomCount(tabs[activeTab].label)}
            </Typography>
          </View>
          <NavTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabPress={handleTabPress}
          />
        </View>
        <Accordion
          rooms={displayRoomAfterFilter}
          onPressRoomDetail={onPressRoomDetail}
        />
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
    marginVertical: 17,
  },
  chip: {
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderRadius: 20,
  },
  headerContainer: {
    backgroundColor: colors.n10,
    // paddingVertical: 17,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    flex:1, 
    paddingTop: 32,
    gap: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 70,
    backgroundColor: colors.n0,
  },
  numberContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: colors.main,
    borderRadius: 100,
  },
});

export default SupervisorRoomMain;
