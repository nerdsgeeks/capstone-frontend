import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "../Typography/Typography";
import FilterIcon from "../../SVG/FilterIcon";
import { colors } from "../../../themes/themes";

const RequestHelpHeaderComponent = () => {
  return (
    <View style={styles.bodyTableHeader}>
      <View
        style={{ flexDirection: "row", gap: 16, flex: 1, alignItems: "center" }}
      >
        <FilterIcon />
        <Typography variant="title-black" style={styles.itemStyle}>
          Request
        </Typography>
      </View>
      <Typography variant="title-black">Room</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyTableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingBottom: 7,
    borderColor: colors.n50,
    borderBottomWidth: 1,
  },
});

export default RequestHelpHeaderComponent;
