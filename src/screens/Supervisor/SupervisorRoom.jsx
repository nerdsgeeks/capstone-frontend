import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import { LinearGradient } from "expo-linear-gradient";
import SupervisorRoomMain from "./SupervisorRoomMain";
import CalendarIcon from "../../SVG/CalendarIcon";
import InformationIcon from "../../SVG/InformationIcon";
import SupervisorInformationModal from "../../components/SupervisorInformationModal/SupervisorInformationModal";
import useBaseUrl from "../../hooks/useBaseUrl";
import axios from "axios";
import Typography from "../../components/Typography/Typography";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";

const SupervisorRoom = ({ navigation }) => {
  const [isInformationModalOpen, setInformationModalOpen] = useState(false);
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

  const onPressRoomDetail = (room) => {
    console.log("room", room);
    navigation.navigate("SupervisorRoomDetail", { room });
  };
  const displayInformation = () => {
    setInformationModalOpen(true);
  };

  const toggleInformationModal = () => {
    setInformationModalOpen(!isInformationModalOpen);
  };

  const date = new Date();
  const showDate =
    date.toLocaleString("default", { day: "numeric" }) +
    " " +
    date.toLocaleString("default", { month: "short" });

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
            <SupervisorRoomHeader
              title={
                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <Typography variant="h4-medium">Rooms</Typography>
                  <TouchableOpacity onPress={displayInformation}>
                    <InformationIcon  w="30" h="30"/>
                  </TouchableOpacity>
                </View>
              }
              icon={<CalendarIcon/>}
              text={showDate}
            />
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.bodyContainer}>
          <SupervisorRoomMain onPressRoomDetail={onPressRoomDetail} />
        </View>
      </View>
      {isInformationModalOpen && (
        <SupervisorInformationModal
          isInformationModalOpen={isInformationModalOpen}
          toggleInformationModal={toggleInformationModal}
        />
      )}
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
    paddingVertical: 22,
    paddingTop: 7,
  },
});

export default SupervisorRoom;
