import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";

const windowWidth = Dimensions.get("window").width;

const BigButton = ({
  name,
  icon,
  text,
  variantTitle= "title-medium",
  variantText = "h4-medium",
  onPress,
  disabled = false,
  width = windowWidth / 2 - 39,
  // height = 120,
  ...props
}) => {
  const shadowStyle = !disabled
    ? Platform.OS === "ios"
      ? styles.shadowIOS
      : styles.shadowAndroid
    : null;

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[styles.touchableOpacity, { width: width }, shadowStyle]}
      disabled={disabled}
    >
      <View style={{ flexDirection: "row"}}>
        <View
          style={[
            disabled ? styles.buttonContainer : styles.disabledStyle,
            { flexGrow: 1},
          ]}
        >
          <Typography variant={variantTitle}>{name}</Typography>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              // backgroundColor: "hotpink",
            }}
          >
            {icon ? icon : <View style={{ width: 40, height: 28 }}></View>}
            {text ? (
              <Typography variant={variantText} >
                {text}
              </Typography>
            ) : (
              <View style={{ width: 30, height: 28 }}></View>
            )}
          </View>
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
    // height: 80,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 13,
    paddingVertical: 20,
    borderRadius: 20,
    borderColor: colors.n20,
    backgroundColor: colors.n1,
    borderWidth: 1,
  },
  disabledStyle: {
    // width: "100%",
    flexDirection: "column",
    gap: 26,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 13,
    paddingVertical: 20,
    borderRadius: 20,
    borderColor: colors.yellow1,
    backgroundColor: colors.n0,
    borderWidth: 1,
  },
  shadowIOS: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5, // For Android
  },
  // shadowAndroid: {
  //   elevation: 5, // For Android
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 3,
  //   },
  //   shadowOpacity: 0.27,
  //   shadowRadius: 4.65,
  // },
});

export default BigButton;
