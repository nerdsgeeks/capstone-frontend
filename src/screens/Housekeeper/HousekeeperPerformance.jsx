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
          setAssignedRooms(data);
        })
        .catch((error) => {
          console.log(error);
        });

    onFetchAssignedRooms();
  }, []);

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
              onPress={() => console.log("poop")}
              firstName="Molly"
              rating="4"
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
              width: 29,
              height: 29,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="small-medium">1</Typography>
          </View>
          <Typography variant="small-black">Feedback</Typography>
        </View>
        <ScrollView style={{ width: "100%" }}>
          {assignedRooms &&
            assignedRooms.map((feedbackroom) => (
              <PerformanceCard room={feedbackroom} />
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
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 26,
    paddingTop: 10,
  },
});

export default HousekeeperPerformance;
