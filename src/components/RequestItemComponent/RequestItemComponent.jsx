import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { colors } from "../../../themes/themes";

const RequestItemComponent = ({ request, onPress }) => {
  const [isChecked, setChecked] = useState(false);
  const { itemName, quantity, roomNumber, date } = request;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.bodyCard}>
        <View style={styles.bodyTopContent}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Typography variant="small-regular" style={styles.itemStyle}>
            {itemName}
          </Typography>
          <Typography variant="small-regular">{quantity}</Typography>
          <Typography variant="small-regular">{roomNumber}</Typography>
        </View>
        <View style={styles.bodyContentBottom}>
          <Typography variant="small-regular">{date}</Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bodyCard: {
    flexDirection: "column",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.n30,
  },
  bodyTopContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    width: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  bodyContentBottom: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
    paddingTop: 20,
    justifyContent: "flex-start",
    width: "80%",
  },
});

export default RequestItemComponent;
