import React from "react";
import { View, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { colors } from "../../../themes/themes";
import Typography from "../Typography/Typography";
import DueOutIcon from "../../SVG/DueOutIcon";
import DueInIcon from "../../SVG/DueInIcon";
import CheckIcon from "../../SVG/CheckIcon";
import CheckedOutIcon from "../../SVG/CheckedOutIcon";

const RoomAccordionButton = ({ room, onPress }) => {
  let roomStyle;
  switch (room.RoomTypeID) {
    case 1:
      roomStyle = {
        backgroundColor: colors.main,
      };
      break;
    case 2:
      roomStyle = {
        backgroundColor: colors.yellow1,
      };
      break;
    case 3:
      roomStyle = {
        backgroundColor: colors.yellow2,
      };
      break;
    case 4:
      roomStyle = {
        backgroundColor: colors.n0,
        borderColor: colors.main,
        borderWidth: 1,
      };
      break;
  }
  const StatusSvg = () => {
    switch (room.RoomStatus) {
      case "dueOut":
        return <DueOutIcon />;
      case "dueIn":
        return <DueInIcon />;
      case "checkedOut":
        return <CheckedOutIcon />;
      case "checkedIn":
        return <CheckIcon stroke={colors.teal} />;
      case "dueOutdueIn":
        return (
          <>
            <DueOutIcon /> <DueInIcon />
          </>
        );
      case "checkedOutcheckedIn":
        return (
          <>
            <CheckedOutIcon /> <CheckIcon />
          </>
        );
      default:
        return <></>;
    }
  };

  
  return (
    <TouchableOpacity style={[styles.container, roomStyle]} onPress={onPress}>
        <Typography variant="body-black">{room.RoomName}</Typography>
        <Typography>{StatusSvg()}</Typography>
    </TouchableOpacity>
  );
};

export default RoomAccordionButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 13,
    flexDirection: "column",
    gap: 24,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "30%",
  },
});
