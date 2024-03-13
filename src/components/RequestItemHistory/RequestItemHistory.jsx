import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import { useState } from "react";
import { colors } from "../../../themes/themes";

const RequestItemComponent = ({ request, onPress }) => {
  const { itemName, quantity, roomNumber, date } = request;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.bodyCard}>
        <View
          style={[
            styles.itemColor,
            request.approvedBySupervisor
              ? styles.approvedItem
              : styles.declinedItem,
          ]}
        ></View>
        <View style= {{ flexGrow: 1}}>
          <View style={styles.bodyTopContent}>
            <Typography variant="small-regular" style={styles.itemStyle}>
              {itemName}
            </Typography>
            <Typography variant="small-regular">{quantity}</Typography>
            <Typography variant="small-regular">{roomNumber}</Typography>
          </View>
          <View style={styles.bodyContentBottom}>
            <Typography variant="small-regular">{date}</Typography>
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
