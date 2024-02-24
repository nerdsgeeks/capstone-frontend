import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import ClockShiftIcon from "../../SVG/ClockShiftIcon";
import { ProgressBar, MD3Colors } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const HousekeeperHomeHeader = ({
  name,
  message,
  taskProgress,
  scheduleTime,
}) => {
  return (
    <View>
      <LinearGradient
        colors={["#F89C7B", "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
        start={{ x: 0.0, y: 0.0 }} // Start at the top-left corner
        end={{ x: 1.0, y: 1.0 }} // End at the bottom-right corner
        locations={[0.0812, 0.7935, 0.8469, 1.1039]} // Approximated locations based on your percentages
        style={styles.container}
      >
        <View style={styles.leftProfileContainer}>
          <Image
            //source={require("./path-to-your-image.jpg")} // Replace with the path to your image
            source={{
              uri: "https://picsum.photos/2000/600?random=11",
            }}
            style={styles.profilePic}
          />
        </View>
        <View style={styles.middleContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Hi {name}</Text>
          <Text>{message}</Text>
          <View style={styles.progressContainer}>
            <Text>Task Progress</Text>
            <ProgressBar progress={0.5} color="#469AA2" />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.rightInnerContainer}>
            <ClockShiftIcon></ClockShiftIcon>
            <Text>{scheduleTime}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
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
  leftProfileContainer: {},
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  middleContainer: {
    rowGap: 6,
  },
  rightContainer: {
    paddingTop: 72,
    justifyContent: "flex-end",
  },
  rightInnerContainer: {
    flexDirection: "row",
  },
  progressContainer: {
    flexDirection: "column",
    rowGap: 6,
  },
});

export default HousekeeperHomeHeader;
