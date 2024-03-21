import React from "react";
import { StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";

const windowWidth = Dimensions.get('window').width;

const BigButton = ({
  name,
  icon,
  text,
  variant = "title-medium",
  onPress,
  disabled,
  width = 160,
  height = 120,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[
        styles.touchableOpacity,
        { width: width },
        { opacity: disabled ? 0.5 : 1 },
      ]}
      disabled={disabled}
    >
      <View style={[styles.buttonContainer, {height: height}]}>
        <Typography variant="small-medium">{name}</Typography>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {icon ? icon : <View style={{ width: 40, height: 28}}></View>}
          {text ? (
            <Typography variant={variant} style={{ width: 50 }}>
              {text}
            </Typography>
          ) : (
            <View style={{ width: 30 , height: 28}}></View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    marginBottom: 24,
    borderRadius: 20,
    alignItems: "flex-start",
    height: 80,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 20,
    alignItems: "flex-start",
    padding: 20,
    borderRadius: 20,
    borderColor: colors.yellow1,
    backgroundColor: colors.n0,
    borderWidth: 1,
  },
});

export default BigButton;
