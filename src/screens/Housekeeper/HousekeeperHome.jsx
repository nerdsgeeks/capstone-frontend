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

const HousekeeperHome = ({ navigation }) => {
  const baseUrl = useBaseUrl();
  const [rooms, setRooms] = useState([]);
  const [items, setItems] = useState([]);

  const itemsStore = useItemsStore((state) => state.itemsStore);
  const updateItemsStore = useItemsStore((state) => state.updateItemsStore);

  useEffect(() => {
    // console.log(baseUrl);
    const apiUrl = baseUrl + "/api/assignedrooms/all";
    const apiItemsUrl = baseUrl + "/api/items/all";

    console.log(baseUrl + "/api/assignedrooms/all");
    console.log(baseUrl + "/api/items/all");
    const onFetchRooms = () =>
      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          setRooms(data);
        })
        .catch((error) => {
          console.log(error);
        });

    const onFetchItems = () =>
      axios
        .get(apiItemsUrl)
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
  }, []);

  return (
    <>
      {rooms.length > 0 && items.length > 0 ? (
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <HousekeeperHomeHeader
              name="Pujan"
              message="Time to shine at work!"
              taskProgress={0.4}
              scheduleTime="10:00-18:00"
            />
            {/* <Text>{itemsStore.length}</Text> */}
            <HousekeeperHomeMain
              rooms={rooms}
              items={items}
              navigation={navigation}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      ) : (
        <SafeAreaProvider>
          <SafeAreaView style={styles.loaderContainer}>
            {/* <Typography variant="body-medium" style={{}}>
              Loading .......
            </Typography> */}
            <LoadingScreen></LoadingScreen>
          </SafeAreaView>
        </SafeAreaProvider>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  chipContainer: {
    flexDirection: "row",
    height: 60,
    marginLeft: 40,
    marginTop: 10,
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
