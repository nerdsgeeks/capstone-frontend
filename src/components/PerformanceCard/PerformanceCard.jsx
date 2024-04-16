import React from "react";
import TierGoldIcon from "../../SVG/TierGoldIcon";
import TierSilverIcon from "../../SVG/TierSilverIcon";
import TierDiamondIcon from "../../SVG/TierDiamondIcon";
import { View, StyleSheet } from "react-native";
import Typography from "../Typography/Typography";
import PersonIcon from "../../SVG/PersonIcon";
import StarIcon from "../../SVG/StarIcon";
import ClockIcon from "../../SVG/ClockIcon";
import { colors } from "../../../themes/themes";
import TextChip from "../TextChip/TextChip";
import Stopwatch from "../Stopwatch/Stopwatch";

const PerformanceCard = ({ room }) => {
  const formatDate = (date) =>
    new Date(date).toISOString().slice(8, 10) +
    "-" +
    new Date(date).toLocaleString("default", { month: "short" });

  const formatTime = (time) => new Date(time).toISOString().slice(11, 16);

  let tierIcon;
  switch (room.RoomTier.toUpperCase()) {
    case "gold".toUpperCase():
      tierIcon = <TierGoldIcon w="36" h="36" />;
      break;
    case "silver".toUpperCase():
      tierIcon = <TierSilverIcon w="36" h="36" />;
      break;
    case "diamond".toUpperCase():
      tierIcon = <TierDiamondIcon w="36" h="36" />;
      break;
    default:
      tierIcon = <TextChip text="NO INFO" />;
      break;
  }

  const renderStars = () => {
    const stars = [];
    const totalStars = 5;

    for (let i = 0; i < room.rating; i++) {
      stars.push(<StarIcon key={i} fill={colors.teal} />);
    }

    for (let i = room.rating; i < totalStars; i++) {
      stars.push(<StarIcon key={i} fill={colors.n30} />);
    }

    return stars;
  };

  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4-medium">{room.RoomName}</Typography>
          <Typography variant="body-regular">
            {formatDate(room.assignedDateTime)}
          </Typography>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body-regular">
            {formatTime(room.startTime)} - {formatTime(room.endTime)}
          </Typography>
          {tierIcon}
        </View>

        <View style={styles.clock}>
          <ClockIcon fill={colors.teal} />
          <Typography variant="body-medium">
            {new Date(room.cleaningDuration).toISOString().slice(11, 19)}
          </Typography>
        </View>

        <View style={styles.feedbackbox}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body-medium">Review</Typography>
            <View style={{ flexDirection: "row", gap: 4 }}>
              {renderStars()}
            </View>
          </View>
          <Typography variant="body-regular">
            {room.inspectionFeedback}
          </Typography>
        </View>
      </View>
    </View>
  );
};

export default PerformanceCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginHorizontal: 26,
    marginVertical: 10,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.n20,
    gap: 10,
    flexGrow: 1,
  },
  clock: {
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 16,
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.pale_teal1,
  },
  feedbackbox: {
    padding: 16,
    gap: 16,
    borderRadius: 8,
    backgroundColor: colors.pale_teal2,
  },
});
