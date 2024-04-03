import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../Typography/Typography";

const TextChip = ({ text, backgroundColor = "white", paddingVertical = 4, paddingHorizontal= 10 }) => {

  return (
      <View style={[styles.container, {backgroundColor: backgroundColor, paddingVertical: paddingVertical, paddingHorizontal: paddingHorizontal}]}>
        <Typography variant="small-medium" >{text}</Typography>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    alignSelf: 'flex-start',
  }
})

export default TextChip;
