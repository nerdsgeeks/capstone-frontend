import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";

const Button = ({ name, type, onPress, style }) => {
  let buttonStyle, textStyle;

  switch (type) {
    case "primary":
      buttonStyle = styles.primary;
      textStyle = styles.primaryText;
      break;
    case "secondary":
      buttonStyle = styles.secondary;
      textStyle = styles.secondaryText;
      break;
    case "tertiary":
      buttonStyle = styles.tertiary;
      textStyle = styles.tertiaryText;
      break;
    case "quaternary":
      buttonStyle = styles.quaternary;
      textStyle = styles.quaternaryText;
      break;
    default:
      buttonStyle = styles.primary;
      textStyle = styles.primaryText;
      break;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle, style]}
    >
      <Typography variant="title-medium" style={textStyle}>
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
  tertiary: {
    backgroundColor: colors.n40,
  },
  quaternary: {
    backgroundColor: colors.n10,
  },
  primaryText: {
    color: colors.n40,
    textAlign: "center",
  },
  secondaryText: {
    color: colors.red,
    textAlign: "center",
  },
  tertiaryText: {
    color: colors.n10,
    textAlign: "center",
  },
  quaternaryText: {
    color: "black",
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button;
