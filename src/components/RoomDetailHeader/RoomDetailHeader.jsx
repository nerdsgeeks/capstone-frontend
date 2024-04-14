import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";
import CheckIcon from "../../SVG/CheckIcon";
import CheckedOutIcon from "../../SVG/CheckedOutIcon";
import DueInIcon from "../../SVG/DueInIcon";
import DueOutIcon from "../../SVG/DueOutIcon";
import BackIcon from "../../SVG/BackIcon";
import TextChip from "../TextChip/TextChip";
import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";

const RoomDetailHeader = ({ room, navigation }) => {
  const StatusSvg = () => {
    switch (room.RoomStatus.toUpperCase()) {
      case "DueOut".toUpperCase():
        return <DueOutIcon w="28" h="28" />;
      case "DueIn".toUpperCase():
        return <DueInIcon w="28" h="28" />;
      case "CheckedOut".toUpperCase():
        return <CheckedOutIcon w="28" h="28" />;
      case "CheckedIn".toUpperCase():
        return (
          <CheckIcon stroke={colors.teal} fill={colors.n0} w="28" h="28" />
        );
      case "DueOut-DueIn".toUpperCase():
        return (
          <>
            <DueOutIcon w="28" h="28" /> <DueInIcon w="28" h="28" />
          </>
        );
      case "CheckedOut-DueIn".toUpperCase():
        return (
          <>
            <CheckedOutIcon w="28" h="28" /> <DueInIcon w="28" h="28" />{" "}
          </>
        );
      default:
        return <Text>Checked In</Text>;
    }
  };

  switch (room.roomTypeName.toUpperCase()) {
    case "Suite".toUpperCase():
      backgroundColor = colors.pink_yellow;
      break;
    case "King Bed".toUpperCase():
      backgroundColor = colors.yellow1;
      break;
    case "Queen Bed".toUpperCase():
      backgroundColor = colors.yellow2;
      break;
    default:
      backgroundColor = colors.n0;
      break;
  }

  switch (room.cleaningStatus.toUpperCase()) {
    case "To Do".toUpperCase():
    case "In Progress".toUpperCase():
      bgColor = colors.main;
      break;
    case "Cleaned".toUpperCase():
      bgColor = colors.yellow1;
      break;
    case "Approved".toUpperCase():
      bgColor = colors.pale_teal1;
      break;
  }

  return (
    <ImageBackground
      source={{ uri: room.RoomImageUrl }}
      style={styles.container}
    >
      <View style={{ gap: 40 }}>
        <View style={styles.line1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <TextChip text={room.cleaningStatus} backgroundColor={bgColor} />
        </View>
        <View>
          <Typography variant="h3-medium" style={{ color: "white" }}>
            {room.RoomName}
          </Typography>
          <View style={styles.bottomLine}>
            <TextChip
              text={room.roomTypeName}
              backgroundColor={backgroundColor}
            />
            <Text style={styles.svg}>{StatusSvg()}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 26,
    paddingTop: 60,
    paddingBottom: 16,
    // gap:50,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: "hidden",
  },
  line1: {
    flexDirection: "row",
    marginBottom: 70,
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default RoomDetailHeader;
