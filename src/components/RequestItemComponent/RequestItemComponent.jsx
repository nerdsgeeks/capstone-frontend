import { StyleSheet, View } from "react-native";
import Typography from "../Typography/Typography";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { colors } from "../../../themes/themes";
const RequestItemComponent = ({room}) => {
  const [isChecked, setChecked] = useState(false);
  const[item, qty, roomno , date] = room;

  return (
    <View style={styles.bodyCard}>
      <View style={styles.bodyTopContent}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Typography variant="small-regular" style={styles.itemStyle}>
            {item}
          </Typography>
          <Typography variant="small-regular">{qty}</Typography>
          <Typography variant="small-regular">{roomno}</Typography>
      </View>
      <View style={styles.bodyContentBottom}>
        <Typography variant="small-regular">{date}</Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    bodyCard:{
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
    paddingTop:20,
    justifyContent: "flex-start",
    width: "80%",
  },
 
});

export default RequestItemComponent;
