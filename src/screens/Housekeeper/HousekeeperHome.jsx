import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HousekeeperHomeHeader from "../../components/HousekeeperHomeHeader/HousekeeperHomeHeader";
import AssignedRoomListItem from "../../components/AssignedRoom/AssignedRoomListItem";
import { Chip } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import NavTabs from "../../components/NavTabs/NavTabs";
import Typography from "../../components/Typography/Typography";
import HousekeeperHomeMain from "../../components/HousekeeperHomeMain/HousekeeperHomeMain";

const HousekeeperHome = ({ navigation }) => {
  const rooms = [
    {
      tier: "gold",
      type: "Suite",
      status: "dueOut",
      roomNumber: "A101",
      date: "Feb 2 - Feb 6 2023",
      isCompleted: true,
      guestName: "Alex Johnson",
    },
    {
      tier: "silver",
      type: "King Bed",
      status: "dueOut",
      roomNumber: "A102",
      date: "Feb 2 - Feb 6 2023",
      isCompleted: true,
      guestName: "Jamie Smith",
    },
    {
      tier: "diamond",
      type: "Queen Bed",
      status: "dueOut",
      roomNumber: "A103",
      date: "Feb 2 - Feb 6 2023",
      isCompleted: true,
      guestName: "Jordan Lee",
    },
    {
      tier: "gold",
      type: "Double Bed",
      status: "dueIn",
      roomNumber: "A104",
      date: "Feb 2 - Feb 6 2023",
      isCompleted: true,
      guestName: "Morgan Brown",
    },
    {
      tier: "gold",
      type: "Suite",
      status: "checkedOut",
      roomNumber: "A105",
      date: "Feb 2 - Feb 6 2023",
      isCompleted: true,
      guestName: "Casey Davis",
    },
    {
      tier: "gold",
      type: "King Bed",
      status: "checkedIn",
      roomNumber: "A106",
      date: "Feb 2 - Feb 6 2023",
      isCompleted: false,
      guestName: "Taylor Martinez",
    },
    {
      tier: "gold",
      type: "Queen Bed",
      status: "dueOutdueIn",
      roomNumber: "A107",
      date: "Feb 2 - Feb 6 2023",
      isCompleted: false,
      guestName: "Jordan Garcia",
    },
    {
      tier: "gold",
      type: "Double Bed",
      status: "checkedOutcheckedIn",
      roomNumber: "A108",
      date: "Feb 2 - Feb 6 2023",
      isCompleted: false,
      guestName: "Charlie Wilson",
    },
  ];

  return (
    <View style={styles.container}>
      <HousekeeperHomeHeader
        name="Pujan"
        message="Time to shine at work!"
        taskProgress={0.4}
        scheduleTime="10:00-18:00"
      ></HousekeeperHomeHeader>
      <HousekeeperHomeMain
        rooms={rooms}
        navigation={navigation}
      ></HousekeeperHomeMain>
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

export default HousekeeperHome;
