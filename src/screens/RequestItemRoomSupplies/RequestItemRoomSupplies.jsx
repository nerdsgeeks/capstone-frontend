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
import Typography from "../../components/Typography/Typography";
import { LinearGradient } from "expo-linear-gradient";
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
} from "../../store/requestStore";
import { useItemsStore } from "../../store/itemsStore";
import { useBaseScreenStore } from "../../store/screensStore";
import RequestItemSearchRoomSupplies from "../../components/RequestItemSearchRoomSupplies/RequestItemSearchRoomSupplies";
import BackIcon from "../../SVG/BackIcon";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import { colors } from "../../../themes/themes";
import NewCartIconOutline from "../../SVG/NewCartIconOutline";
import Close from "../../SVG/Close";

const RequestItemRoomSupplies = ({ route, navigation }) => {
  const { roomDetails } = route.params;
  // const { items } = route.params;
  const [itemsFiltered, setItemsFiltered] = useState([]);
  const [isRequestHelpModalTextFocused, setIsRequestHelpModalTextFocused] =
    useState(false);
  const [showItemsList, setShowItemsList] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const onFocusSearchInput = () => {
    setIsRequestHelpModalTextFocused(true);
    setShowItemsList(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.ItemName.toUpperCase().includes(searchQuery.toUpperCase()),
    );
    setItemsFiltered(filtered);
  }, [searchQuery, items]);

  const items = useItemsStore((state) => state.itemsStore);
  const updateItemsStore = useItemsStore((state) => state.updateItemsStore);

  const requestedItemsCartRoomSuppliesStore = useRequestCartRoomSuppliesStore(
    (state) => state.requestedItemsCartRoomSuppliesStore,
  );

  const baseScreenStore = useBaseScreenStore((state) => state.baseScreenStore);
  const updateBaseScreenStore = useBaseScreenStore(
    (state) => state.updateBaseScreenStore,
  );

  useEffect(() => {
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
    navigation.navigate("RequestItemRoomSuppliesOrder", {
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
                  style={{
                    flexDirection: "row",
                    gap: 16,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={goBack}
                    // style={{ marginRight: 20 }}
                  >
                    <BackIcon />
                  </TouchableOpacity>
                  <Typography
                    variant="screenHeader-medium"
                    // style={{ borderWidth: 2 }}
                  >
                    Room Supplies
                  </Typography>
                </View>
              }
              icon={
                <TouchableOpacity onPress={onCartIconPressed} style={{}}>
                  <NewCartIconOutline fill={colors.n40} />
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: colors.n40,
                      height: 24,
                      width: 24,
                      borderRadius: 12,
                      justifyContent: "center",
                      alignItems: "center",
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <Typography
                      variant="xs-regular"
                      style={{ color: colors.n0 }}
                    >
                      {requestedItemsCartRoomSuppliesStore.length}
                    </Typography>
                  </View>
                </TouchableOpacity>
              }
            />
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.searchBoxContainer}>
          <Typography variant="body-regular">Search</Typography>
          <View>
            <View
              style={{
                position: "absolute",
                top: 16,
                left: 10,
              }}
            >
              <SearchIcon w="24" h="24" fill={colors.n30} />
            </View>
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={{ position: "absolute", top: 16, right: 10, zIndex: 10 }}
                onPress={clearSearch}
              >
                <Close stroke={colors.n30}></Close>
              </TouchableOpacity>
            )}
            <TextInput
              style={[styles.requestItemSearchInput]}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={onFocusSearchInput}
            />
          </View>
        </View>
        <RequestItemSearchRoomSupplies
          headerText="Items"
          roomDetails={roomDetails}
          navigation={navigation}
          items={itemsFiltered}
        ></RequestItemSearchRoomSupplies>
      </View>
    </SafeAreaProvider>
  );
};

export default RequestItemRoomSupplies;

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
    paddingVertical: 18,
    paddingTop: 7,
  },
  searchBoxContainer: {
    paddingHorizontal: 26,
    paddingTop: 12,
    width: "100%",
  },
  requestItemSearchInput: {
    borderWidth: 1,
    borderColor: colors.n30,
    borderRadius: 12,
    marginTop: 6,
    padding: 10,
    paddingLeft: 36,
    height: 44,
  },
});
