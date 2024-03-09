import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";

const BigButton = ({ name, icon, text, type, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        marginBottom: 24,
        borderRadius: 20,
        alignItems: "flex-start",
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
          {icon ? icon : <View style={{width:40, height:28}}></View>}
          {text ? (
            <Typography variant="h5-medium">{text}</Typography>
          ) : (
            <View style={{width:30, height:28}}></View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
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
