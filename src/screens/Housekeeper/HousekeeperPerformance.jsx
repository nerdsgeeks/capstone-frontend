import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PerformanceHeader from "../../components/PerformanceHeader/PerformanceHeader";
import { LinearGradient } from "expo-linear-gradient";
import CalendarIcon from "../../SVG/CalendarIcon";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../../themes/themes";
import useBaseUrl from "../../hooks/useBaseUrl";
import axios from "axios";
import PerformanceCard from "../../components/PerformanceCard/PerformanceCard";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";

const HousekeeperPerformance = ({ navigation }) => {
  const [assignedRooms, setAssignedRooms] = useState([]);
  const [feedbackCount, setFeedbackCount] = useState();

  const baseUrl = useBaseUrl();

  const accessTokenStore = useAccessTokenStore(
    (state) => state.accessTokenStore,
  );
  const updateAccessTokenStore = useAccessTokenStore(
    (state) => state.updateAccessTokenStore,
  );

  const employeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.employeeDetailsStore,
  );
  const updateEmployeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.updateEmployeeDetailsStore,
  );

  useEffect(() => {
    const apiUrl = baseUrl + "/api/assignedrooms/all";
    console.log(employeeDetailsStore);
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };

    console.log(apiUrl);
    const onFetchAssignedRooms = () =>
      axios
        .get(apiUrl, config)
        .then((response) => {
          const data = response.data;
          const filteredData = data.filter(
            (assignedRoom) =>
              assignedRoom.assignedEmployeeID === employeeDetailsStore.userId &&
              assignedRoom.cleaningStatus === "Approved",
          );
          console.log("filteredData");
          console.log(filteredData);
          setFeedbackCount(filteredData.length);
          setAssignedRooms(filteredData.reverse());
        })
        .catch((error) => {
          console.log(error);
        });

    onFetchAssignedRooms();
  }, []);

  const totalRating = assignedRooms.reduce((acc, room) => {
    return acc + room.rating;
  }, 0);
  const averageRating = (totalRating / assignedRooms.length).toFixed(2);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={["#F89C7B", "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          locations={[0.01, 0.7, 0.92, 1.0]}
          style={styles.headerContainer}
        >
          <SafeAreaView>
            <PerformanceHeader
              onPress={() => navigation.goBack()}
              firstName={employeeDetailsStore.firstName}
              rating={averageRating}
            />
          </SafeAreaView>
        </LinearGradient>
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
            marginHorizontal: 26,
          }}
        >
          <View
            style={{
              backgroundColor: colors.main,
              borderRadius: 20,
              width: 35,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="title-medium">{feedbackCount}</Typography>
          </View>
          <Typography variant="title-black">Feedback</Typography>
        </View>
        <ScrollView style={{ width: "100%" }}>
          {assignedRooms &&
            assignedRooms.map((feedbackroom) => (
              <PerformanceCard key={feedbackroom.ID} room={feedbackroom} />
            ))}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 16,
    backgroundColor: "white",
  },
  headerContainer: {
    width: "100%",
    borderBottomLeftRadius: 60,
    paddingHorizontal: 26,
    paddingVertical: 22,
    paddingTop: 7,
  },
});

export default HousekeeperPerformance;
