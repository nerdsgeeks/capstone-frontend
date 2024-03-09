import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";

const BigButton = ({
  name,
  icon,
  text,
  variant = "title-medium",
  onPress,
  disabled,
  width = 160,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        marginBottom: 24,
        borderRadius: 20,
        alignItems: "flex-start",
        height: 80,
        width: { width },
      }}
    >
      <View style={styles.buttonContainer}>
        <Typography variant="small-medium">{name}</Typography>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {icon ? icon : <View style={{ width: 40, height: 28 }}></View>}
          {text ? (
            <Typography variant={variant} style={{ width: 50 }}>
              {text}
            </Typography>
          ) : (
            <View style={{ width: 30, height: 28 }}></View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 20,
    alignItems: "flex-start",
    padding: 25,
    borderRadius: 20,
    borderColor: colors.yellow1,
    backgroundColor: colors.n0,
    borderWidth: 1,
    // justifyContent: "center"
  },
  clickable: {},
  notClickable: {},
});

export default BigButton;
