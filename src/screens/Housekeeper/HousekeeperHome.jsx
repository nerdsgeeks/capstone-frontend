import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TestModal from "../../TestModal";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import HomeIcon from "../../SVG/HomeIcon";
import ProfileIcon from "../../SVG/ProfileIcon";
import CartIcon from "../../SVG/CartIcon";

const HousekeeperHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TestModal />
      <HomeIcon fill="#FECE8C"></HomeIcon>
      <ProfileIcon fill="#FECE8C"></ProfileIcon>
      <CartIcon fill="#FECE8C"></CartIcon>
      <Button name="Primary" type="secondary" onPress={handleClick} />
      <Typography variant="h1 black" style={{ color: "blue" }}>
        Hello World!
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HousekeeperHome;
