import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { colors } from "../../../themes/themes";

const RequestHelpComponent = ({
  request,
  onPress,
  updateRequestCompletion,
}) => {
  const {
    helperRequestedAdditionalNotes,
    Quantity,
    RoomName,
    startTime,
    isHelperRequestedApproved,
  } = request;
  const [completed, setCompleted] = useState(isHelperRequestedApproved);

  const monthAbbreviations = new Intl.DateTimeFormat("en", {
    month: "short",
  }).format(new Date(startTime));
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    new Date(startTime),
  );
  const hours = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(startTime));

  const formattedTime = day + " " + monthAbbreviations + " " + hours;

  const changeStatus = () => {
    const updatedRequest = {
      ...request,
      isHelperRequestedApproved: !completed,
    };
    setCompleted(!completed);
    updateRequestCompletion(updatedRequest);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.bodyCard}>
        <View style={styles.bodyTopContent}>
          <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
            <Checkbox
              style={styles.checkbox}
              value={completed}
              onValueChange={changeStatus}
              color={colors.teal}
            />
            <Typography variant="title-regular" style={styles.itemStyle}>
              {helperRequestedAdditionalNotes}
            </Typography>
          </View>
          <Typography variant="title-regular">{RoomName}</Typography>
        </View>
        <View style={styles.bodyContentBottom}>
          <Typography variant="title-regular">{formattedTime}</Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bodyCard: {
    flexDirection: "column",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.n30,
    paddingHorizontal: 6,
  },
  bodyTopContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bodyContentBottom: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    justifyContent: "flex-start",
  },
});

export default RequestHelpComponent;
