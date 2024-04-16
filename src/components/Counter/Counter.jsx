import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PlusIcon from "../../SVG/PlusIcon";
import MinusIcon from "../../SVG/MinusIcon";
import Typography from "../Typography/Typography";

const Counter = ({
  count,
  handleIncrement,
  handleDecrement,
  containerStyle,
  disabled = false,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View>
        <Typography variant="small-medium">Quantity</Typography>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDecrement}
          disabled={disabled}
        >
          <MinusIcon w="26" h="26"></MinusIcon>
        </TouchableOpacity>

        <Typography variant="body-medium">{count}</Typography>

        <TouchableOpacity
          style={styles.button}
          onPress={handleIncrement}
          disabled={disabled}
        >
          <PlusIcon w="26" h="26"></PlusIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Counter;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  counterContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  count: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
