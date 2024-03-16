import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { colors } from "../../../themes/themes";

const RequestItemComponent = ({ request, onPress, }) => {
  const { ItemName, Quantity, RoomName, RequestedDateTime, isCompleted } = request; 
  const [completed, setCompleted] = useState(isCompleted);
 
  const changeStatus = () => {  
    setCompleted(!completed);
  }

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
            {ItemName}
          </Typography>
          <Typography variant="small-regular">{Quantity}</Typography>
          <Typography variant="small-regular">{RoomName}</Typography>
        </View>
        <View style={styles.bodyContentBottom}>
          <Typography variant="small-regular">{RequestedDateTime}</Typography>
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
});

export default RequestItemComponent;
