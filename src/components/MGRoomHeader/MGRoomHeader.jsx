import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";
import { LinearGradient } from "expo-linear-gradient";
import CalendarIcon from "../../SVG/CalendarIcon";

const MGRoomHeader = ({ name, message, image }) => {
  const today = new Date();
  const shortMonthName = today.toLocaleString("default", { month: "short" });
  const formattedDate = `${today.getDate()} ${shortMonthName} `;

  return (
    <View style={styles.container}>
      {image && (
        <Image
        source={{
          uri: image,
        }}
        style={styles.profilePic}
      />
      )}
      
      <View style={styles.rightContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography variant="title-black">Hi {name}</Typography>
          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <CalendarIcon />
            <Typography variant="body-medium">{formattedDate}</Typography>
          </View>
        </View>
        <Typography variant="small-regular">
          Teamwork makes the dream work
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
  },
  rightContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    gap: 8,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default MGRoomHeader;
