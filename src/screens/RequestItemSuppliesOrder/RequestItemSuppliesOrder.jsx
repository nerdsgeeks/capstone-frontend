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
import { SafeAreaProvider } from "react-native-safe-area-context";
import CartIcon from "../../SVG/CartIcon";
import { useRequestCartStore } from "../../store/requestStore";
import RequestedItemsList from "../../components/RequestedItemsList/RequestedItemsList";

const RequestItemSuppliesOrder = ({ route, navigation }) => {
  const requestedItemsCartStore = useRequestCartStore(
    (state) => state.requestedItemsCartStore,
  );
  const updateRequestedItemsCartStore = useRequestCartStore(
    (state) => state.updateRequestedItemsCartStore,
  );
  const onOrderPressed = () => {
    console.log("onOrderPressed");
    updateRequestedItemsCartStore([]);
    // navigation.navigate("RoomDetail", { roomDetails: roomDetails });
    navigation.goBack();
  };
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* <Text> {requestedItemsCartStore.length}</Text> */}
        <View style={{ flexDirection: "column", rowGap: 20 }}>
          <RequestedItemsList
            items={requestedItemsCartStore}
            showRequestedItemText={false}
          ></RequestedItemsList>

          <TouchableOpacity
            style={{
              backgroundColor: "#8FDEDE",
              borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginTop: 10,
              width: 150,
              alignSelf: "center",
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
            onPress={onOrderPressed}
          >
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default RequestItemSuppliesOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    paddingTop: 20,
  },
});
