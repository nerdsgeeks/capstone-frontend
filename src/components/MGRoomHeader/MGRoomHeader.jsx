import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";
import { LinearGradient } from "expo-linear-gradient";
import CalendarIcon from "../../SVG/CalendarIcon";

const MGRoomHeader = () => {
  const today = new Date();
  const shortMonthName = today.toLocaleString('default', { month: 'short' });
  const formattedDate = `${today.getDate()} ${shortMonthName} ${today.getFullYear()}`;

  return (
    <LinearGradient
    colors={[colors.main, '#ffd9a5', colors.n10]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 25,
      paddingVertical: 15,
      borderBottomLeftRadius: 50,
    }}
  >
      <Typography variant="h5-black">Rooms</Typography>
      <View style={styles.rightContainer}>
        <CalendarIcon />
        <Typography variant="xs-medium">{formattedDate}</Typography>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 60,
    backgroundColor: "#F89C7B",
    flexDirection: "row",
    justifyContent: "space-around",
    columnGap: 10,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  rightContainer: {
    flexDirection: "row",
    gap: 6,
  },
  rightInnerContainer: {
    flexDirection: "row",
  },
  progressContainer: {
    flexDirection: "column",
    rowGap: 6,
  },
});

export default MGRoomHeader;
