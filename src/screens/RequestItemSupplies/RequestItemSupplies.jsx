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
import { SafeAreaProvider } from "react-native-safe-area-context";
import CartIcon from "../../SVG/CartIcon";
import { useRequestCartStore } from "../../store/requestStore";

const RequestItemSupplies = ({ route, navigation }) => {
  const { roomDetails } = route.params;
  const { items } = route.params;
  const requestedItemsCartStore = useRequestCartStore(
    (state) => state.requestedItemsCartStore,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.screenTitle || "Welcome",
      headerRight: () => (
        <TouchableOpacity onPress={onCartIconPressed} style={{}}>
          <CartIcon stroke="#000000"></CartIcon>
          <View
            style={{
              position: "absolute",
              backgroundColor: "#FECE8C",
              height: 24,
              width: 24,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              left: 14,
              bottom: 10,
            }}
          >
            <Typography variant="xs-regular">
              {requestedItemsCartStore.length}
            </Typography>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, requestedItemsCartStore]);

  const onCartIconPressed = () => {
    navigation.navigate("RequestItemSuppliesOrder", {});
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text> {requestedItemsCartStore.length}</Text>
        <RequestItemSearch
          headerText="Items"
          roomDetails={roomDetails}
          navigation={navigation}
          items={items}
        ></RequestItemSearch>
      </View>
    </SafeAreaProvider>
  );
};

export default RequestItemSupplies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    paddingTop: 20,
  },
  searchBoxContainer: {
    alignSelf: "flex-start",
    marginLeft: 100,
  },
});
