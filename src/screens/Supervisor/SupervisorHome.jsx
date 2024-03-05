import React from "react";
import { StyleSheet, View } from "react-native";
import MGRoomHeader from "../../components/MGRoomHeader/MGRoomHeader";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SupervisorHome = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={["#F89C7B", "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          locations={[0.01, 0.7, 0.92, 1.0]}
          style={styles.headerGradient}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <MGRoomHeader
              name="thalha"
              message="some quote is here just act as this is a quote"
            />
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.body}>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fcbbc",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerGradient: {
    width: "100%",
    height: "20%",
    borderBottomLeftRadius: 60,
    padding:20
  },
 
});

export default SupervisorHome;
