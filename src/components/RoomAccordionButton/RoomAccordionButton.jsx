import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../../themes/themes";
import Typography from "../Typography/Typography";
import DueOutIcon from "../../SVG/DueOutIcon";
import DueInIcon from "../../SVG/DueInIcon";
import CheckIcon from "../../SVG/CheckIcon";
import CheckedOutIcon from "../../SVG/CheckedOutIcon";

const RoomAccordionButton = ({ room }) => {
  let roomStyle;
  switch (room.roomTypeId) {
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
    switch (room.roomStatus) {
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
    <View style={[styles.container, roomStyle]}>
      <Typography variant="body-black">{room.roomName}</Typography>
      <View>{StatusSvg()}</View>
    </View>
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
  },
});
