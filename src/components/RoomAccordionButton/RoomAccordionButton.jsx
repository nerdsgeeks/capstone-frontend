import React from "react";
import { View, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { colors } from "../../../themes/themes";
import Typography from "../Typography/Typography";
import DueOutIcon from "../../SVG/DueOutIcon";
import DueInIcon from "../../SVG/DueInIcon";
import CheckIcon from "../../SVG/CheckIcon";
import CheckedOutIcon from "../../SVG/CheckedOutIcon";

const RoomAccordionButton = ({ room, onPressRoomDetail }) => {
  let roomStyle;
  switch (room.roomTypeName) {
    case "Suite":
      roomStyle = {
        backgroundColor: colors.main,
      };
      break;
    case "King Bed":
      roomStyle = {
        backgroundColor: colors.yellow1,
      };
      break;
    case "Queen Bed":
      roomStyle = {
        backgroundColor: colors.yellow2,
      };
      break;
    default:
      roomStyle = {
        backgroundColor: colors.n0,
        borderColor: colors.main,
        borderWidth: 1,
      };
      break;
  }
  const StatusSvg = () => {
    switch (room.RoomStatus.toUpperCase()) {
      case "DueOut".toUpperCase():
        return <DueOutIcon />;
      case "DueIn".toUpperCase():
        return <DueInIcon />;
      case "CheckedOut".toUpperCase():
        return <CheckedOutIcon />;
      case "CheckedIn".toUpperCase():
        return <CheckIcon stroke={colors.teal} fill={colors.n0} />;
      case "DueOut-DueIn".toUpperCase():
        return (
          <>
            <DueOutIcon /> <DueInIcon />
          </>
        );
      case "CheckedOut-DueIn".toUpperCase():
        return (
          <>
            <CheckedOutIcon /> <DueInIcon />{" "}
          </>
        );
      default:
        return <Text>Checked In</Text>;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, roomStyle]}
      onPress={onPressRoomDetail}
    >
      <Typography variant="body-black">{room.RoomName}</Typography>
      <Typography>{StatusSvg()}</Typography>
    </TouchableOpacity>
  );
};

export default RoomAccordionButton;

const styles = StyleSheet.create({
  container: {
    // marginTop: 13,
    flexDirection: "column",
    gap: 24,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "30%",
  },
});
