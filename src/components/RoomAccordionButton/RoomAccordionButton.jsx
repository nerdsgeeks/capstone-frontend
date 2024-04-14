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
        borderColor: colors.main,
        borderWidth: 1,
      };
      break;
    case "King Bed":
      roomStyle = {
        backgroundColor: colors.yellow1,
        borderColor: colors.yellow1,
        borderWidth: 1,
      };
      break;
    case "Queen Bed":
      roomStyle = {
        backgroundColor: colors.yellow2,
        borderColor: colors.yellow2,
        borderWidth: 1,
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
        return <><DueOutIcon w="28" h="28" /></>;
      case "DueIn".toUpperCase():
        return <DueInIcon w="28" h="28" />;
      case "CheckedOut".toUpperCase():
        return <CheckedOutIcon w="28" h="28" />;
      case "CheckedIn".toUpperCase():
        return <CheckIcon stroke={colors.teal} fill={colors.n0} w="28" h="28"/>;
      case "DueOut-DueIn".toUpperCase():
        return (
          <>
            <DueOutIcon w="28" h="28"/> <DueInIcon w="28" h="28"/>
          </>
        );
      case "CheckedOut-DueIn".toUpperCase():
        return (
          <>
            <CheckedOutIcon w="28" h="28"/> <DueInIcon w="28" h="28"/>
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
      <Typography variant="h5-black">{room.RoomName}</Typography>
      <Typography>{StatusSvg()}</Typography>
    </TouchableOpacity>
  );
};

export default RoomAccordionButton;

const styles = StyleSheet.create({
  container: {
    // marginTop: 13,
    flexDirection: "column",
    gap: 20,

    borderRadius: 6,
    padding:15,
    width: "30%",
  },
});
