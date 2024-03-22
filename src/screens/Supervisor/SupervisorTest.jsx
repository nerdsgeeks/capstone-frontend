import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import BedIcon from "../../SVG/BedIcon";
import { useTestStore } from "./../../store/testStore";
import InspectionReview from "./InspectionReview";
import useBaseUrl from "../../hooks/useBaseUrl";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import Gallery from "../../components/Gallery/Gallery";
import { Camera } from "expo-camera";
import CameraComponent from "../../components/Camera/CameraComponent";
import SupervisorRequestHistory from "./SupervisorRequestHistory";
import { colors } from "../../../themes/themes";
import LoginScreen from "../LoginScreen";
import LoadingScreen from "../LoadingScreen";
import SupervisorRoomDetail from "./SupervisorRoomDetail";

// export function BearCounter() {
//   const bears = useTestStore((state) => state.bears);
//   return <Text>{bears} bears around here...</Text>;
// }

// // Controls component
// export function Controls() {
//   const increasePopulation = useTestStore((state) => state.increasePopulation);

//   return <Button onPress={increasePopulation} title="one up" />;
// }

const SupervisorTest = ({ navigation }) => {


  return (
    <ScrollView style={styles.container}>
     <SupervisorRoomDetail/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});
//   container: {
//     flex: 1,
//     backgroundColor: "#8fcbbc",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   scrollViewcontainer: {
//     flex: 1,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   header: {
//     fontWeight: "bold",
//     flex: 1,
//   },
//   cell: {
//     flex: 1,
//   },
// });

// },
// scrollViewcontainer: {
//   flex: 1,
//   height: 400,
// },
// row: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: 10,
//   borderBottomWidth: 1,
//   borderBottomColor: "#ddd",
// },
// header: {
//   fontWeight: "bold",
//   flex: 1,
// },
// cell: {
//   flex: 1,
// },
// });

export default SupervisorTest;
