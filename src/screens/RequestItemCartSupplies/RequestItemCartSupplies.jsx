import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "../../components/Typography/Typography";
import RoomDetailInfo from "../../components/RoomDetailInfo/RoomDetailInfo";
import RoomDetailHeader from "../../components/RoomDetailHeader/RoomDetailHeader";
import HelpIcon from "../../SVG/HelpIcon";
import RequestIcon from "../../SVG/RequestIcon";
import PlayIcon from "../../SVG/PlayIcon";
import PauseIcon from "../../SVG/PauseIcon";
import CheckIcon from "../../SVG/CheckIcon";
import Stopwatch from "../../components/Stopwatch/Stopwatch";
import RequestedItemsList from "../../components/RequestedItemsList/RequestedItemsList";
import CloseIcon from "../../SVG/CloseIcon";
import AddNote from "../../components/AddNote/AddNote";
import PlusIcon from "../../SVG/PlusIcon";
import SearchIcon from "../../SVG/SearchIcon";
import SearchInput from "../../components/SearchInput/SearchInput";
import RequestItemSearch from "../../components/RequestItemSearch/RequestItemSearch";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CartIcon from "../../SVG/CartIcon";
import {
  useRequestCartRoomSuppliesStore,
  useRequestCartStore,
  useRequestCartSuppliesStore,
} from "../../store/requestStore";
import { useItemsStore } from "../../store/itemsStore";
import { useBaseScreenStore } from "../../store/screensStore";
import RequestItemSearchCartSupplies from "../../components/RequestItemSearchCartSupplies/RequestItemSearchCartSupplies";
import BackIcon from "../../SVG/BackIcon";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import { colors } from "../../../themes/themes";

const RequestItemCartSupplies = ({ route, navigation }) => {
  const { roomDetails } = route.params;
  // const { items } = route.params;
  const [itemsFiltered, setItemsFiltered] = useState([]);

  const items = useItemsStore((state) => state.itemsStore);
  const updateItemsStore = useItemsStore((state) => state.updateItemsStore);
  // console.log("items");
  // console.log(items);

  const requestedItemsCartSuppliesStore = useRequestCartSuppliesStore(
    (state) => state.requestedItemsCartSuppliesStore,
  );
  const updateRequestedItemsCartSuppliesStore = useRequestCartSuppliesStore(
    (state) => state.updateRequestedItemsCartSuppliesStore,
  );

  const baseScreenStore = useBaseScreenStore((state) => state.baseScreenStore);
  const updateBaseScreenStore = useBaseScreenStore(
    (state) => state.updateBaseScreenStore,
  );

  // console.log("baseScreenStore Supplies");
  // console.log(baseScreenStore);
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: route.params.screenTitle || "Welcome",
  //     headerRight: () => (
  //       <TouchableOpacity onPress={onCartIconPressed} style={{}}>
  //         <CartIcon stroke="#000000"></CartIcon>
  //         <View
  //           style={{
  //             position: "absolute",
  //             backgroundColor: "#FECE8C",
  //             height: 24,
  //             width: 24,
  //             borderRadius: 12,
  //             justifyContent: "center",
  //             alignItems: "center",
  //             left: 14,
  //             bottom: 10,
  //           }}
  //         >
  //           <Typography variant="xs-regular">
  //             {requestedItemsCartSuppliesStore.length}
  //           </Typography>
  //         </View>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation, requestedItemsCartSuppliesStore]);

  useEffect(() => {
    console.log(route.params.screenTitle);
    switch (route.params.screenTitle.toUpperCase()) {
      case "Room Supplies".toUpperCase():
        const filteredItemsRoom = items.filter(
          (item) => item.GroupName === "Room Supplies",
        );

        // Update state with filtered items
        setItemsFiltered(filteredItemsRoom);
        break;
      case "Cart Supplies".toUpperCase():
        const filteredItemsCart = items.filter(
          (item) => item.GroupName === "Cart Supplies",
        );

        // Update state with filtered items
        setItemsFiltered(filteredItemsCart);
        break;
    }
  }, []);

  const onCartIconPressed = () => {
    navigation.navigate("RequestItemCartSuppliesOrder", {
      roomDetails: roomDetails,
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

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
                  style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                >
                  <TouchableOpacity onPress={goBack}>
                    <BackIcon />
                  </TouchableOpacity>
                  <Typography variant="h4-medium">Cart Supplies</Typography>
                </View>
              }
              icon={  
                      <TouchableOpacity onPress={onCartIconPressed} style={{}}>
                        <CartIcon stroke={colors.n40}></CartIcon>
                        <View
                          style={{
                            position: "absolute",
                            backgroundColor: colors.n40,
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            justifyContent: "center",
                            alignItems: "center",
                            left: 14,
                            bottom: 10,
                          }}
                        >
                          <Typography variant="xs-regular" style={{color: colors.n0}}>
                            {requestedItemsCartSuppliesStore.length}
                          </Typography>
                        </View>
                      </TouchableOpacity>}
            />
          </SafeAreaView>
        </LinearGradient>
        {/* <Text> {requestedItemsCartSuppliesStore.length}</Text> */}
        {/* <Text>RequestItemCartSupplies</Text> */}
        <RequestItemSearchCartSupplies
          headerText="Items"
          roomDetails={roomDetails}
          navigation={navigation}
          items={itemsFiltered}
        ></RequestItemSearchCartSupplies>
      </View>
    </SafeAreaProvider>
  );
};

export default RequestItemCartSupplies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    backgroundColor: colors.n0,
  },
  headerContainer: {
    width: "100%",
    borderBottomLeftRadius: 60,
    paddingHorizontal: 26,
    paddingTop: 7,
  },
  searchBoxContainer: {
    alignSelf: "flex-start",
    marginLeft: 100,
  },
});
