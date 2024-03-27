import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../Typography/Typography";

const TextChip = ({ text, backgroundColor = "white" }) => {

  return (
      <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        <Typography variant="small-medium" >{text}</Typography>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  }
})

export default TextChip;
