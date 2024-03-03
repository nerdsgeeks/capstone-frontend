import React from "react";
import TierGoldIcon from "../../SVG/TierGoldIcon";
import TierSilverIcon from "../../SVG/TierSilverIcon";
import TierDiamondIcon from "../../SVG/TierDiamondIcon";
import { View, StyleSheet } from "react-native";
import Typography from "../Typography/Typography";
import PersonIcon from "../../SVG/PersonIcon";
import CalendarIcon from "../../SVG/CalendarIcon";

const RoomDetailInfo = ({ reservation, room }) => {
  let tierIcon;
  switch (room.tier) {
    case "gold":
      tierIcon = <TierGoldIcon />;
      break;
    case "silver":
      tierIcon = <TierSilverIcon />;
      break;
    case "diamond":
      tierIcon = <TierDiamondIcon />;
      break;
    default:
      tierIcon = <TextChip text="NO INFO" />;
      break;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body-regular">{reservation.guestName}</Typography>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {tierIcon}
          <View style={{ paddingLeft: 10 }}>
            <PersonIcon fill="black" />
          </View>
          <Typography variant="small-regular" style={{ paddingLeft: 3 }}>
            {reservation.noOfGuest}
          </Typography>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CalendarIcon />
        <Typography variant="xs-medium" style={{ paddingLeft: 10 }}>
          {reservation.checkIn} - {reservation.checkOut}
        </Typography>
      </View>
      {reservation.additionalNotes ? (
        <View
          style={{
            flexDirection: "column",
            gap: 6,
            padding: 10,
            backgroundColor: "#DAEBEC",
            borderRadius: 8,
          }}
        >
          <Typography variant="xs-medium">Requests:</Typography>
          <Typography variant="xs-regular">
            {"\u2022"} {reservation.additionalNotes}
          </Typography>
        </View>
      ) : null}
    </View>
  );
};

export default RoomDetailInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginHorizontal: 26,
    marginVertical: 20,
    gap: 10,
  },
});
