import React, { useState, useEffect } from "react";
import { Button, StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../../themes/themes";
import axios from "axios";
import useBaseUrl from "../../hooks/useBaseUrl";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import ProfileIcon from "../../SVG/ProfileIcon";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";

const SupervisorStaff = () => {
  const [employees, setEmployees] = useState([]);
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
    const apiUrl = baseUrl + "/api/employees/all";
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    const onFetchEmployees = () =>
      axios
        .get(apiUrl, config)
        .then((response) => {
          const data = response.data;
          setEmployees(data);
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
        });
    onFetchEmployees();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.main, "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          locations={[0.01, 0.7, 0.92, 1.0]}
          style={styles.headerContainer}
        >
          <SafeAreaView>
            <SupervisorRoomHeader title="Staff List" />
          </SafeAreaView>
        </LinearGradient>
        <ScrollView style={styles.table}>
          <View style={styles.tableHeader}>
            <Typography variant="xs-black">Name</Typography>
            <Typography variant="xs-black">Current Room</Typography>
            <Typography variant="xs-black">Schedule</Typography>
          </View>
          {employees
            .filter((employee) => employee.EmployeeType === 2)
            .map((employee, index) => (
              <View key={index} style={styles.tableRow}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1.7,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <View
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 35,
                        borderColor: colors.teal,
                        borderWidth: 3,
                        justifyContent: "flex-end",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <ProfileIcon
                        stroke={colors.teal}
                        fill={colors.teal}
                        w="24"
                        h="24"
                      />
                    </View>
                    <View>
                      <Typography variant="xs-medium">
                        {employee.FirstName}
                      </Typography>
                      <Typography variant="xs-medium">
                        {employee.LastName}
                      </Typography>
                    </View>
                  </View>
                  <Typography variant="xs-medium">Current Room</Typography>
                </View>

                <View style={{ alignItems: "flex-end", flex: 1 }}>
                  <Typography variant="xs-medium">
                    {employee.ShiftSchadule.split(" ")[0]}
                  </Typography>
                  <Typography variant="xs-medium">
                    {employee.ShiftSchadule.split(" ")[1]}
                  </Typography>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerContainer: {
    width: "100%",
    borderBottomLeftRadius: 60,
    paddingHorizontal: 26,
    paddingTop: 7,
  },
  table: {
    paddingTop: 24,
    paddingHorizontal: 26,
  },
  tableHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.n20,
  },
});

export default SupervisorStaff;
