import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Typography from "../Typography/Typography";
import CalendarIcon from "../../SVG/CalendarIcon";
import DueOutIcon from "../../SVG/DueOutIcon";
import CheckIcon from "../../SVG/CheckIcon";
import DueInIcon from "../../SVG/DueInIcon";
import CheckedOutIcon from "../../SVG/CheckedOutIcon";
import TierGoldIcon from "../../SVG/TierGoldIcon";
import TierSilverIcon from "../../SVG/TierSilverIcon";
import TierDiamondIcon from "../../SVG/TierDiamondIcon";
import { colors } from "../../../themes/themes";
const AssignedRoomListItem = ({ room }) => {
  const roomTier = () => {
    switch (room.RoomTier.toUpperCase()) {
      case "GOLD":
        return <TierGoldIcon w="36" h="36" />;
      case "SILVER":
        return <TierSilverIcon w="36" h="36" />;
      case "DIAMOND":
        return <TierDiamondIcon w="36" h="36" />;
      default:
        return <Text>Checked In</Text>;
    }
  };

  const StatusSvg = () => {
    switch (room.RoomStatus.toUpperCase()) {
      case "DueOut".toUpperCase():
        return <DueOutIcon w="26" h="26" />;
      case "DueIn".toUpperCase():
        return <DueInIcon w="26" h="26" />;
      case "CheckedOut".toUpperCase():
        return <CheckedOutIcon w="26" h="26" />;
      case "CheckedIn".toUpperCase():
        return <CheckIcon stroke={colors.teal} w="26" h="26" />;
      case "DueOut-DueIn".toUpperCase():
        return (
          <>
            <DueOutIcon w="26" h="26" /> <DueInIcon w="26" h="26" />
          </>
        );
      case "CheckedOut-DueIn".toUpperCase():
        return (
          <>
            <CheckedOutIcon w="26" h="26" /> <DueInIcon w="26" h="26" />
          </>
        );
      default:
        return <Text>Checked In</Text>;
    }
  };

  const formatDateRange = (checkinDate, checkoutDate) => {
    // Convert the ISO strings to Date objects
    const checkinDateSplitted = checkinDate.split("T");
    const checkoutDateSplitted = checkoutDate.split("T");
    const checkin = new Date(checkinDateSplitted[0]);
    const checkout = new Date(checkoutDateSplitted[0]);

    // Use Intl.DateTimeFormat to format the dates as needed
    const options = { month: "short", day: "numeric" };
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      checkin,
    );

    const formattedCheckin = new Intl.DateTimeFormat("en", options).format(
      checkin,
    );
    const formattedCheckout = new Intl.DateTimeFormat("en", options).format(
      checkout,
    );

    // Combine the parts into the final string
    return `${formattedCheckin} - ${formattedCheckout} ${year}`;
  };

  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4-regular" style={styles.text}>
            {room.RoomName}
          </Typography>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <CalendarIcon />
            <Typography variant="small-regular">
              {formatDateRange(room.CheckinDate, room.CheckoutDate)}
            </Typography>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.svg}>{StatusSvg()}</Text>
          <Text style={styles.text}>{roomTier()}</Text>
        </View>
      </View>
    </View>
  );
};

export default AssignedRoomListItem;

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 20,
    shadowColor: colors.n30,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // For Android
    elevation: 4,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.n20,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 26,
    gap: 16,
    marginVertical: 8,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
