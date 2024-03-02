import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Typography from "../../components/Typography/Typography";
import RoomDetailInfo from "../../components/RoomDetailInfo/RoomDetailInfo";
import RoomDetailHeader from "../../components/RoomDetailHeader/RoomDetailHeader";

const RoomDetail = ({ route, navigation }) => {
  const { roomDetails } = route.params;
  console.log(roomDetails);

  const roomGoldCheckedOutcheckedIn = {
    tier: roomDetails.tier,
    type: roomDetails.type,
    status: roomDetails.status,
    roomNumber: roomDetails.roomNumber,
    date: roomDetails.date,
  };

  const reservation = {
    id: 12345,
    roomId: roomDetails.roomNumber,
    checkIn: "2024-03-10",
    checkOut: "2024-03-15",
    guestName: roomDetails.guestName,
    noOfGuest: 2,
    additionalNotes: "Prefer a room with a view if available.",
    isCompleted: roomDetails.isCompleted,
  };
  return (
    <View style={styles.container}>
      <RoomDetailHeader
        room={roomDetails}
        taskStatus={"Cleaning"}
      ></RoomDetailHeader>
      <RoomDetailInfo
        room={roomGoldCheckedOutcheckedIn}
        reservation={reservation}
      ></RoomDetailInfo>
    </View>
  );
};

export default RoomDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
  },
});
