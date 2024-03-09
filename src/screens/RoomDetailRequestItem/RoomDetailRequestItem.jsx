import React, { useEffect, useState } from "react";
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

const RoomDetailRequestItem = ({ route, navigation }) => {
  const { roomDetails } = route.params;

  const items = [
    {
      id: "1",
      imageSrc: "https://picsum.photos/2000/600?random=11",
      itemName: "Item 1",
    },
    {
      id: "2",
      imageSrc: "https://picsum.photos/2000/600?random=12",
      itemName: "Item 2",
    },
    {
      id: "3",
      imageSrc: "https://picsum.photos/2000/600?random=13",
      itemName: "Item 3",
    },
    {
      id: "4",
      imageSrc: "https://picsum.photos/2000/600?random=14",
      itemName: "Item 4",
    },
    {
      id: "5",
      imageSrc: "https://picsum.photos/2000/600?random=15",
      itemName: "Item 5",
    },
    {
      id: "6",
      imageSrc: "https://picsum.photos/2000/600?random=16",
      itemName: "Item 6",
    },
    {
      id: "7",
      imageSrc: "https://picsum.photos/2000/600?random=17",
      itemName: "Item 7",
    },
    {
      id: "8",
      imageSrc: "https://picsum.photos/2000/600?random=18",
      itemName: "Item 8",
    },
    {
      id: "9",
      imageSrc: "https://picsum.photos/2000/600?random=19",
      itemName: "Item 9",
    },
  ];

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Typography variant="title-black">Request Items</Typography>
        <Typography variant="body-regular">
          Room: {roomDetails.roomNumber}
        </Typography>

        <RequestItemSearch
          headerText="Items"
          roomDetails={roomDetails}
          navigation={navigation}
        ></RequestItemSearch>
      </View>
    </SafeAreaProvider>
  );
};

export default RoomDetailRequestItem;

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
