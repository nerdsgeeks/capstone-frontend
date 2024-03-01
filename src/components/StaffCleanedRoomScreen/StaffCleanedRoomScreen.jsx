import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "../Typography/Typography";
import ClockIcon from "../../SVG/ClockIcon";
import AddNote from "../AddNote/AddNote";
import Button from "../Button/Button";

const StaffCleanedRoomScreen = () => {
  return (
    <View style={styles.container}>
      <Typography variant="h1-black">Room Cleaned</Typography>
      <View style={styles.imageConatiner}>
        <ClockIcon w={140} h={110} />
        </View>
      <View style={styles.timeContainer}>
        <ClockIcon />
        <Typography variant="h3-black">20:00:00</Typography>
      </View>
      <View style={styles.multipleImageContainer}>
        <ClockIcon />
        <ClockIcon />
        <ClockIcon />
      </View>
      <View style={styles.addNoteContainer}>
        <Typography variant="h5-black">Add Note</Typography>
      <AddNote />
      </View>
      <Button name="Done" type="primary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
    alignItems: "center",

  },
    imageConatiner: {
        padding: 20,
    },
    timeContainer: {
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    multipleImageContainer: {
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        //need to  add width 75 and 75 once images areggetched
    },
  
});

export default StaffCleanedRoomScreen;
