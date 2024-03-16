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
import BackgroundImage from "../../../assets/Rooms-Card.png";

const RoomDetailHeader = ({ room, taskStatus, navigation }) => {
  const StatusSvg = () => {
    switch (room.Rooms_RoomStatus.toUpperCase()) {
      case "DueOut".toUpperCase():
        return <DueOutIcon />;
      case "DueIn".toUpperCase():
        return <DueInIcon />;
      case "CheckedOut".toUpperCase():
        return <CheckedOutIcon />;
      case "CheckedIn".toUpperCase():
        return <CheckIcon stroke="green" />;
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
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <View style={styles.line1}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <TextChip text={taskStatus} backgroundColor="#F89C7B" />
      </View>
      <View>
        <Typography variant="h4-medium" style={{ color: "white" }}>
          {room.RoomName}
        </Typography>
        <View style={styles.bottomLine}>
          <TextChip text={room.type} />
          <Text style={styles.svg}>{StatusSvg()}</Text>
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
    paddingBottom: 12,
    paddingTop: 40,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: "hidden",
  },
  line1: {
    flexDirection: "row",
    marginBottom: 77,
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
