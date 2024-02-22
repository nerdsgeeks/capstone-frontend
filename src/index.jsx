import React  from "react";
import {  StyleSheet , View  } from "react-native";
import TestModal from "./TestModal";

const App = () => {
  return (
    <View style={styles.container}>
      <TestModal />
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
