import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import HelpIcon from "../../SVG/HelpIcon";
import RequestIcon from "../../SVG/RequestIcon";
import PlayIcon from "../../SVG/PlayIcon";
import CheckIcon from "../../SVG/CheckIcon";
import PauseIcon from "../../SVG/PauseIcon";

const RoomButton = ({ type, onPress, isDisabled }) => {
  let icon, text;

  switch (type) {
    case "help":
      icon = <HelpIcon />;
      text = "Help";
      break;
    case "request":
      icon = <RequestIcon />;
      text = "Request";
      break;
    case "start":
      icon = <PlayIcon />;
      text = "Start";
      break;
    case "done":
      icon = <CheckIcon />;
      text = "Done";
      break;
    case "pause":
      icon = <PauseIcon />;
      text = "Pause";
      break;
    default:
      icon = null;
      text = "Unknown";
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}>
      <View style={[styles.buttonContainer, isDisabled && styles.disabledButton]}>
        {icon}
        <Typography variant="button-regular" style={styles.buttonText}>
          {text}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "#FFFFFF",
    elevation: 3,
    borderRadius: 12,
    width: 54,
    height: 54,
    alignSelf: "flex-start",
  },
  buttonText: {
    marginTop: 8.5,
  },
});

export default RoomButton;
