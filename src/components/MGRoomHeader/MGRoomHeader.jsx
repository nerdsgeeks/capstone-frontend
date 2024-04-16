import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";
import { LinearGradient } from "expo-linear-gradient";
import CalendarIcon from "../../SVG/CalendarIcon";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";

const MGRoomHeader = ({ name, message, image }) => {
  const today = new Date();
  const shortMonthName = today.toLocaleString("default", { month: "short" });
  const formattedDate = `${today.getDate()} ${shortMonthName} `;

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

  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={{
            uri: `${employeeDetailsStore.imageURL}`,
          }}
          style={styles.profilePic}
        />
      )}

      <View style={styles.rightContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography variant="h4-regular">
            Hi {employeeDetailsStore.firstName}
          </Typography>
          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <CalendarIcon w="19.11" h="22" />
            <Typography variant="body-medium">{formattedDate}</Typography>
          </View>
        </View>
        <Typography variant="body-regular">
          Teamwork makes the dream work
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
  },
  rightContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    gap: 8,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
});

export default MGRoomHeader;
