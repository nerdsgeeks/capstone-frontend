import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import { useState } from "react";
import { colors } from "../../../themes/themes";

const RequestHelpHistory = ({ request, onPress }) => {
  const { helperRequestedAdditionalNotes, Quantity, RoomName, startTime,isHelperRequestedApproved } = request;
  const monthAbbreviations = new Intl.DateTimeFormat("en", {
    month: "short",
  }).format(new Date(startTime));
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    new Date(startTime),
  );
  const hours = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(startTime));

  const formattedTime = day + " " + monthAbbreviations + " " + hours;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.bodyCard}>
        <View
          style={[
            styles.itemColor,
            request.isHelperRequestedApproved
              ? styles.approvedItem
              : styles.declinedItem,
          ]}
        ></View>
        <View style= {{ flexGrow: 1}}>
          <View style={styles.bodyTopContent}>
            <Typography variant="small-regular" style={styles.itemStyle}>
              {helperRequestedAdditionalNotes}
            </Typography>
            <Typography variant="small-regular">{Quantity}</Typography>
            <Typography variant="small-regular">{RoomName}</Typography>
          </View>
          <View style={styles.bodyContentBottom}>
            <Typography variant="small-regular">{formattedTime}</Typography>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bodyCard: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.n30,
  },
  itemColor: {
    width: 6,
    height: 54,
  },
  approvedItem: {
    backgroundColor: colors.pale_teal1,
  },
  declinedItem: {
    backgroundColor: colors.red,
  },
  bodyTopContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
  },

  bodyContentBottom: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    justifyContent: "flex-start",
  },
});

export default RequestHelpHistory;
