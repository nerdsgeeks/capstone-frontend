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
  const { AdditionalNotes, Quantity, RoomName, startTime, isCompleted } =
    request;
  const [completed, setCompleted] = useState(isCompleted);

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
    const updatedRequest = { ...request, isCompleted: !completed };
    setCompleted(!completed);
    updateRequestCompletion(updatedRequest);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.bodyCard}>
        <View style={styles.bodyTopContent}>
          <Checkbox
            style={styles.checkbox}
            value={completed}
            onValueChange={changeStatus}
          />
          <Typography variant="small-regular" style={styles.itemStyle}>
            {AdditionalNotes}
          </Typography>
          <Typography variant="small-regular">{RoomName}</Typography>
        </View>
        <View style={styles.bodyContentBottom}>
          <Typography variant="small-regular">{formattedTime}</Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bodyCard: {
    flexDirection: "column",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.n30,
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
  itemStyle: {
    width: "40%",
  },
});

export default RequestHelpComponent;
