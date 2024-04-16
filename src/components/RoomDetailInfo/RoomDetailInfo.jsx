import React from "react";
import TierGoldIcon from "../../SVG/TierGoldIcon";
import TierSilverIcon from "../../SVG/TierSilverIcon";
import TierDiamondIcon from "../../SVG/TierDiamondIcon";
import { View, StyleSheet, Text } from "react-native";
import Typography from "../Typography/Typography";
import PersonIcon from "../../SVG/PersonIcon";
import CalendarIcon from "../../SVG/CalendarIcon";
import { colors } from "../../../themes/themes";
import TextChip from "../TextChip/TextChip";

const RoomDetailInfo = ({ reservation, room }) => {
  let tierIcon;
  if (room.RoomTier) {
    switch (room.RoomTier.toUpperCase()) {
      case "gold".toUpperCase():
        tierIcon = <TierGoldIcon w="30" h="30" />;
        break;
      case "silver".toUpperCase():
        tierIcon = <TierSilverIcon w="30" h="30" />;
        break;
      case "diamond".toUpperCase():
        tierIcon = <TierDiamondIcon w="30" h="30" />;
        break;
      default:
        tierIcon = <TextChip text="No Info" />;
        break;
    }
  } else {
    switch (room.tier.toUpperCase()) {
      case "gold".toUpperCase():
        tierIcon = <TierGoldIcon w="30" h="30" />;
        break;
      case "silver".toUpperCase():
        tierIcon = <TierSilverIcon w="30" h="30" />;
        break;
      case "diamond".toUpperCase():
        tierIcon = <TierDiamondIcon w="30" h="30" />;
        break;
      default:
        tierIcon = <TextChip text="No Info" />;
    }
  }
  const formatDateRange = (CheckinDate, CheckoutDate) => {
    // Convert the ISO strings to Date objects
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
    return `${formattedCheckin} - ${formattedCheckout}`;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          paddingTop: 3,
        }}
      >
        <Typography variant="h5-regular">{reservation.guestName}</Typography>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.text}>{tierIcon}</Text>
          <View style={{ paddingLeft: 10 }}>
            <PersonIcon fill="black" w="18.33" h="30" />
          </View>
          <Typography variant="h5-medium" style={{ paddingLeft: 3 }}>
            {reservation.noOfGuest}
          </Typography>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CalendarIcon />
        <Typography variant="body-medium" style={{ paddingLeft: 10 }}>
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
          <Typography variant="body-medium">Requests:</Typography>
          <Typography variant="body-regular">
            {"\u2022"} {reservation.additionalNotes}
          </Typography>
        </View>
      ) : <View
      style={{
        flexDirection: "column",
        gap: 10,
        padding: 16,
        backgroundColor: colors.pale_teal2,
        borderRadius: 8,
      }}
    >
      <Typography variant="body-medium">Requests:</Typography>
      <Typography variant="body-regular">
        {"\u2022"} {reservation.AdditionalNotes}
      </Typography>
    </View>}
    </View>
  );
};

export default RoomDetailInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginHorizontal: 26,
    // marginVertical: 20,
    gap: 10,
  },
});
