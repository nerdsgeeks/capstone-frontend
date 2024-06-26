import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HousekeeperHomeHeader from "../../components/HousekeeperHomeHeader/HousekeeperHomeHeader";
import AssignedRoomListItem from "../../components/AssignedRoom/AssignedRoomListItem";
import { Chip } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import NavTabs from "../../components/NavTabs/NavTabs";
import Typography from "../../components/Typography/Typography";
import HousekeeperHomeMain from "../../components/HousekeeperHomeMain/HousekeeperHomeMain";
import useBaseUrl from "../../hooks/useBaseUrl";
import axios from "axios";
import { useItemsStore } from "../../store/itemsStore";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LoadingScreen from "../LoadingScreen";
import { useRoomDetailsStore, useRoomsStore } from "../../store/roomStore";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../../../themes/themes";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";

const HousekeeperHome = ({ navigation }) => {
  const baseUrl = useBaseUrl();
  const [rooms, setRooms] = useState([]);
  const [items, setItems] = useState([]);
  const [taskProgress, setTaskProgress] = useState([0]);

  const itemsStore = useItemsStore((state) => state.itemsStore);
  const updateItemsStore = useItemsStore((state) => state.updateItemsStore);
  const roomDetailsStore = useRoomDetailsStore(
    (state) => state.roomDetailsStore,
  );
  const updateRoomDetailsStore = useRoomDetailsStore(
    (state) => state.updateRoomDetailsStore,
  );

  const roomsStore = useRoomsStore((state) => state.roomsStore);
  const updateRoomsStore = useRoomsStore((state) => state.updateRoomsStore);

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
    const localDate = new Date();
    const today =
      localDate.getFullYear() +
      "-" +
      String(localDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(localDate.getDate()).padStart(2, "0");

    const apiUrl =
      baseUrl +
      `/api/assignedrooms/getAssignedRoomView/${employeeDetailsStore.userId}/${today}`;
    const apiItemsUrl = baseUrl + "/api/items/all";

    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };

    const onFetchRooms = () =>
      axios
        .get(apiUrl, config)
        .then((response) => {
          const data = response.data;

          setRooms(data);
          updateRoomsStore(data);
          if (data.length > 0) {
            const completedCount = data.filter(
              (room) =>
                room.cleaningStatus.toUpperCase() === "CLEANED" ||
                room.cleaningStatus.toUpperCase() === "APPROVED",
            ).length;
            const totalCount = data.length;
            setTaskProgress((completedCount / totalCount).toFixed(1));
          }
        })
        .catch((error) => {
          console.log(error);
        });

    const onFetchItems = () =>
      axios
        .get(apiItemsUrl, config)
        .then((response) => {
          const data = response.data;

          setItems(data);
          updateItemsStore(data);
        })
        .catch((error) => {
          console.log(error);
        });

    onFetchRooms();
    onFetchItems();
  }, [roomDetailsStore]);

  useFocusEffect(
    React.useCallback(() => {
      const localDate = new Date();
      const today =
        localDate.getFullYear() +
        "-" +
        String(localDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(localDate.getDate()).padStart(2, "0");

      const apiUrl =
        baseUrl +
        `/api/assignedrooms/getAssignedRoomView/${employeeDetailsStore.userId}/${today}`;
      const apiItemsUrl = `${baseUrl}/api/items/all`;
      const config = {
        headers: {
          Authorization: `Bearer ${accessTokenStore}`,
        },
      };

      const fetchRooms = async () => {
        try {
          const response = await axios.get(apiUrl, config);
          const data = response.data;

          setRooms(data);
          updateRoomsStore(data);
          if (data.length > 0) {
            const completedCount = data.filter(
              (room) =>
                room.cleaningStatus.toUpperCase() === "CLEANED" ||
                room.cleaningStatus.toUpperCase() === "APPROVED",
            ).length;
            const totalCount = data.length;
            setTaskProgress((completedCount / totalCount).toFixed(1));
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchRooms();

      // Return a no-op function if no clean-up is needed
      return () => {};
    }, [baseUrl, roomDetailsStore]),
  );

  return (
    <>
      {rooms && items.length > 0 ? (
        <SafeAreaProvider>
          {/* <SafeAreaView style={styles.container}> */}
          <View style={styles.container}>
            <LinearGradient
              colors={["#F89C7B", "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 1.0 }}
              locations={[0.01, 0.7, 0.92, 1.0]}
              style={styles.headerContainer}
            >
              {/* <Text>{taskProgress}</Text> */}
              <SafeAreaView>
                <HousekeeperHomeHeader
                  name="Pujan"
                  message="Time to shine at work!"
                  taskProgress={taskProgress}
                  scheduleTime="10:00-18:00"
                />
              </SafeAreaView>
            </LinearGradient>
            <HousekeeperHomeMain
              rooms={roomsStore}
              items={items}
              navigation={navigation}
            />
          </View>
          {/* </SafeAreaView> */}
        </SafeAreaProvider>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.n10,
  },
  headerContainer: {
    borderBottomLeftRadius: 70,
    paddingHorizontal: 26,
    paddingBottom: 16,
    // paddingTop: 32,
  },
  chipContainer: {
    flexDirection: "row",
    marginLeft: 26,
    marginTop: 16,
  },
  assignedRoomListContainer: {
    flexDirection: "column",
    marginTop: 10,
    paddingLeft: 26,
    paddingVertical: 15,
    height: 510,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  NavTabRowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollViewAssignedRoomListContainerContent: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  NavTabContainer: {
    // borderColor: "black",
    // borderWidth: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HousekeeperHome;
