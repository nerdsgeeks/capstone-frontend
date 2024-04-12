import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { colors } from "../../../themes/themes";

const RequestItemComponent = ({ request, onPress,updateRequestCompletion }) => {
  const { ItemName, Quantity, RoomName, RequestedDateTime, isCompleted } = request; 
  const [completed, setCompleted] = useState(isCompleted);

  const monthAbbreviations = new Intl.DateTimeFormat("en", {
    month: "short",
  }).format(new Date(RequestedDateTime));
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    new Date(RequestedDateTime),
  );
  const hours = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(RequestedDateTime));

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
          
          <View style={{ flexDirection: "row", gap: 16, flex: 1, alignItems: "center"}}>
            <Checkbox
              style={styles.checkbox}
              value={completed}
              onValueChange={changeStatus}
              color={colors.teal}
            />
            <Typography variant="title-regular" style={styles.itemStyle}>
              {ItemName}
            </Typography>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 0.7}}>
            <Typography variant="title-regular">{Quantity}</Typography>
            <Typography variant="title-regular">{RoomName ? RoomName : "N.A"}</Typography>
          </View>
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

export default RequestItemComponent;
