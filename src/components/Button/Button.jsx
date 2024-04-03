import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";

// To Use it in your code -> name should be given in parent component
// onpress  if you want to do something on click
// there are two types of buttons primary and secondary

const Button = ({ name, type, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        type === "primary" ? styles.primary : styles.secondary,
        style,
      ]}
    >
      <Typography
        variant="title-medium"
        style={type === "primary" ? styles.primaryText : styles.secondaryText}
      >
        {name}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 60,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    shadowColor: colors.n50,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
  },
  primary: {
    backgroundColor: colors.pale_teal1,
  },
  secondary: {
    backgroundColor: colors.n0,
    borderColor: colors.red,
    borderWidth: 1,
  },
  primaryText: {
    color: colors.n40,
    textAlign: "center",
  },
  secondaryText: {
    color: colors.red,
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button;
