import React from "react";
import TierGoldIcon from "../../SVG/TierGoldIcon";
import TierSilverIcon from "../../SVG/TierSilverIcon";
import TierDiamondIcon from "../../SVG/TierDiamondIcon";
import { View, StyleSheet } from "react-native";
import Typography from "../Typography/Typography";
import PersonIcon from "../../SVG/PersonIcon";
import CalendarIcon from "../../SVG/CalendarIcon";
import { colors } from "../../../themes/themes";
import TextChip from "../TextChip/TextChip";

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
  const formatDateRange = (CheckinDate, CheckoutDate) => {
    // Convert the ISO strings to Date objects
    console.log(`checkinDate : ${CheckinDate}`);
    console.log(`checkoutDate : ${CheckoutDate}`);
    const checkinDateSplitted = CheckinDate.split("T");
    const checkoutDateSplitted = CheckoutDate.split("T");
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
          {formatDateRange(reservation.CheckinDate, reservation.CheckoutDate)}
        </Typography>
      </View>
      {reservation.additionalNotes ? (
        <View
          style={{
            flexDirection: "column",
            gap: 6,
            padding: 10,
            backgroundColor: colors.pale_teal2,
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
