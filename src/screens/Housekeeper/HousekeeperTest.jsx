import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TestModal from "../../TestModal";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import HomeIcon from "../../SVG/HomeIcon";
import ProfileIcon from "../../SVG/ProfileIcon";
import CartIcon from "../../SVG/CartIcon";
import AssignedRoomListItem from "../../components/AssignedRoom/AssignedRoomListItem";

const HousekeeperTest = ({ navigation }) => {
  const roomGoldDueout = {
    type: "gold", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    status: "dueOut", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };
  const roomSilverDueout = {
    type: "silver", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    status: "dueOut", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };
  const roomDiamondDueout = {
    type: "silver", // Could be 'gold', 'silver', 'silver', or another value for the default case
    status: "dueOut", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };

  const roomGoldDueIn = {
    type: "gold", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    status: "dueIn", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };

  const roomGoldCheckedOut = {
    type: "gold", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    status: "checkedOut", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };

  const roomGoldCheckedIn = {
    type: "gold", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    status: "checkedIn", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };

  const roomGoldDueOutdueIn = {
    type: "gold", // Could be 'gold', 'silver', 'diamond', or another value for the default case
    status: "dueOutdueIn", // Could be one of the predefined statuses or another value for the default case
    roomNumber: "101", // Room number
    date: "2023-04-01", // Date associated with the room status
  };

  const roomGoldCheckedOutcheckedIn = {
    type: "gold", // Could be 'gold', 'silver', 'diamond', or another value for the default case
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
