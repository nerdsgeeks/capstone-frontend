import { View, StyleSheet, ImageBackground, Text } from "react-native";
import CheckIcon from "../../SVG/CheckIcon";
import CheckedOutIcon from "../../SVG/CheckedOutIcon";
import DueInIcon from "../../SVG/DueInIcon";
import DueOutIcon from "../../SVG/DueOutIcon";
import BackIcon from "../../SVG/BackIcon";
import TextChip from "../TextChip/TextChip";
import Typography from "../Typography/Typography";
import BackgroundImage from "../../../assets/Rooms-Card.png";

const RoomDetailHeader = ({ room, taskStatus }) => {
  let statusIcon;
  console.log(room);

  const StatusSvg = () => {
    switch (room.status) {
      case "dueOut":
        return <DueOutIcon />;
      case "dueIn":
        return <DueInIcon />;
      case "checkedOut":
        return <CheckedOutIcon />;
      case "checkedIn":
        return <CheckIcon stroke="green" />;
      case "dueOutdueIn":
        return (
          <>
            <DueOutIcon /> <DueInIcon />
          </>
        );
      case "checkedOutcheckedIn":
        return (
          <>
            <CheckedOutIcon /> <CheckIcon />{" "}
          </>
        );
      default:
        return <Text>Checked In</Text>;
    }
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <View style={styles.line1}>
        <BackIcon />
        <TextChip text={taskStatus} backgroundColor="#F89C7B" />
      </View>
      <View>
        <Typography variant="h4-medium" style={{ color: "white" }}>
          {room.roomNumber}
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
