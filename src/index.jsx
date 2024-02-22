import React from "react";
import { StyleSheet, View } from "react-native";
import TestModal from "./TestModal";
import Button from "./components/Button/Button";
import Typography from "./components/Typography/Typography";

const App = () => {
  handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <View style={styles.container}>
      <TestModal />
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

export default App;
