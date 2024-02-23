import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TestModal from "../../TestModal";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import HomeIcon from "../../SVG/HomeIcon";
import ProfileIcon from "../../SVG/ProfileIcon";
import CartIcon from "../../SVG/CartIcon";
import AssignedRoomListItem from "../../components/AssignedRoom/AssignedRoomListItem";
import HousekeeperHomeHeader from "../../components/HousekeeperHomeHeader/HousekeeperHomeHeader";
import ClockIcon from "../../SVG/ClockIcon";
import ClockShiftIcon from "../../SVG/ClockShiftIcon";

const HousekeeperTest = ({ navigation }) => {
  const roomGoldDueout = {
    tier: "gold", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    type: "Suite",
    status: "dueOut", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };
  const roomSilverDueout = {
    tier: "silver", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    type: "King Bed",
    status: "dueOut", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };
  const roomDiamondDueout = {
    tier: "diamond", // Could be 'gold', 'silver', 'silver', or another value for the default case
    type: "Queen Bed",
    status: "dueOut", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };

  const roomGoldDueIn = {
    tier: "gold", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    type: "Double Bed",
    status: "dueIn", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };

  const roomGoldCheckedOut = {
    tier: "gold", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    type: "Suite",
    status: "checkedOut", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };

  const roomGoldCheckedIn = {
    tier: "gold", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    type: "King Bed",
    status: "checkedIn", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };

  const roomGoldDueOutdueIn = {
    tier: "gold", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    type: "Queen Bed",
    status: "dueOutdueIn", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };

  const roomGoldCheckedOutcheckedIn = {
    tier: "gold", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    type: "Double Bed",
    status: "checkedOutcheckedIn", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };

  return (
    <ScrollView style={styles.container}>
      <TestModal />
      <HomeIcon fill="#FECE8C"></HomeIcon>
      <ProfileIcon fill="#FECE8C"></ProfileIcon>
      <CartIcon fill="#FECE8C"></CartIcon>
      <Button name="Primary" type="secondary" onPress={handleClick} />
      <Typography variant="h1 black" style={{ color: "blue" }}>
        Hello World!
      </Typography>
      <HousekeeperHomeHeader
        name="Pujan"
        message="Time to shine at work!"
        taskProgress={0.4}
        scheduleTime="10:00-18:00"
      ></HousekeeperHomeHeader>
      <ClockIcon></ClockIcon>
      <ClockShiftIcon></ClockShiftIcon>
      <AssignedRoomListItem room={roomGoldDueout} />
      <AssignedRoomListItem room={roomSilverDueout} />
      <AssignedRoomListItem room={roomDiamondDueout} />

      <AssignedRoomListItem room={roomGoldDueIn} />
      <AssignedRoomListItem room={roomGoldCheckedOut} />
      <AssignedRoomListItem room={roomGoldCheckedIn} />
      <AssignedRoomListItem room={roomGoldDueOutdueIn} />
      <AssignedRoomListItem room={roomGoldCheckedOutcheckedIn} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});

export default HousekeeperTest;
