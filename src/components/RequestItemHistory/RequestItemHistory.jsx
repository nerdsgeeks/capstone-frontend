import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import { useState } from "react";
import { colors } from "../../../themes/themes";

const RequestItemComponent = ({ request, onPress }) => {
  const { ItemName, Quantity, RoomName, RequestedDateTime } = request;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.bodyCard}>
        <View
          style={[
            styles.itemColor,
            request.isCompleted
              ? styles.approvedItem
              : styles.declinedItem,
          ]}
        ></View>
        <View style= {{ flexGrow: 1}}>
          <View style={styles.bodyTopContent}>
            <Typography variant="small-regular" style={styles.itemStyle}>
              {ItemName}
            </Typography>
            <Typography variant="small-regular">{Quantity}</Typography>
            <Typography variant="small-regular">{RoomName}</Typography>
          </View>
          <View style={styles.bodyContentBottom}>
            <Typography variant="small-regular">{RequestedDateTime}</Typography>
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

export default RequestItemComponent;
