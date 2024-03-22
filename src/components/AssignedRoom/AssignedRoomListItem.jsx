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
const AssignedRoomListItem = ({ room }) => {
  // console.log(room);
  const roomTier = () => {
    // console.log(room.RoomTier);
    switch (room.RoomTier) {
      case "gold":
        return <TierGoldIcon />;
      case "silver":
        return <TierSilverIcon />;
      case "diamond":
        return <TierDiamondIcon />;
      default:
        return <Text>Checked In</Text>;
    }
  };

  const StatusSvg = () => {
    switch (room.RoomStatus.toUpperCase()) {
      case "DueOut".toUpperCase():
        return <DueOutIcon />;
      case "DueIn".toUpperCase():
        return <DueInIcon />;
      case "CheckedOut".toUpperCase():
        return <CheckedOutIcon />;
      case "CheckedIn".toUpperCase():
        return <CheckIcon stroke="green" />;
      case "DueOut-DueIn".toUpperCase():
        return (
          <>
            <DueOutIcon /> <DueInIcon />
          </>
        );
      case "CheckedOut-DueIn".toUpperCase():
        return (
          <>
            <CheckedOutIcon /> <DueInIcon />{" "}
          </>
        );
      default:
        return <Text>Checked In</Text>;
    }
  };

  const formatDateRange = (checkinDate, checkoutDate) => {
    // Convert the ISO strings to Date objects
    // console.log(`checkinDate : ${checkinDate}`);
    // console.log(`checkoutDate : ${checkoutDate}`);
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Typography variant="h5-regular" style={styles.text}>
          {room.RoomName}
        </Typography>
        <View style={styles.dateContainer}>
          <CalendarIcon />
          <Text style={styles.text}>
            {formatDateRange(room.CheckinDate, room.CheckoutDate)}
          </Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.svg}>{StatusSvg()}</Text>
        <Text style={styles.text}>{roomTier()}</Text>
      </View>
    </View>
  );
};

export default AssignedRoomListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    maxWidth: 314,
    maxHeight: 84,
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  text: {
    textAlign: "center",
  },
});

// to use this component, import it into the file where you want to use it like below
//     <AssignedRoomListItem room={room} />
