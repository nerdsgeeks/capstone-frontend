import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Typography from "../Typography/Typography";
import ClockIcon from "../../SVG/ClockIcon";
import AddNote from "../AddNote/AddNote";
import Button from "../Button/Button";

const StaffCleanedRoomScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Typography variant="h5-black">Job Well Done</Typography>
      </View>
      <View style={styles.imageConatiner}>
        <Image
          source={require("./../../../assets/request-help-modal-image.png")}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.timeContainer}>
        <ClockIcon w="22" h="22" />
        <Typography variant="body-regular">20:00:00</Typography>
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
  imageStyle: {
    width: 140,
    height: 110,
  },
});

export default StaffCleanedRoomScreen;
