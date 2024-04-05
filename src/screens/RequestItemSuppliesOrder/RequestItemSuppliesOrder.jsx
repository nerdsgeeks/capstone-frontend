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
import useBaseUrl from "../../hooks/useBaseUrl";
import axios from "axios";
import { useBaseScreenStore } from "../../store/screensStore";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";

const RequestItemSuppliesOrder = ({ route, navigation }) => {
  const { roomDetails } = route.params;
  const requestedItemsCartStore = useRequestCartStore(
    (state) => state.requestedItemsCartStore,
  );
  const updateRequestedItemsCartStore = useRequestCartStore(
    (state) => state.updateRequestedItemsCartStore,
  );

  const baseUrl = useBaseUrl();
  const baseScreenStore = useBaseScreenStore((state) => state.baseScreenStore);
  const updateBaseScreenStore = useBaseScreenStore(
    (state) => state.updateBaseScreenStore,
  );

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

  console.log("baseScreenStore");
  console.log(baseScreenStore);

  const onOrderPressed = () => {
    console.log("onOrderPressed");
    const currentDateTimeStamp = toLocalISODate(
      new Date(),
      "America/Vancouver",
    );
    const apiUrl = baseUrl + "/api/requestItems/addRequestItem";
    console.log(requestedItemsCartStore);

    requestedItemsCartStore.forEach((item, index) => {
      // Your logic here
      const tempRequestedItem = {
        assignedRoomID: item.assignedRoomID,
        RequestedItemID: item.RequestedItemID,
        Quantity: item.count,
        Note: item.Note,
        RequestedDateTime: currentDateTimeStamp,
        isCompleted: false,
        approvedBySupervisorID: 0,
        requestItemStatus: "",
      };
      const config = {
        headers: {
          Authorization: `Bearer ${accessTokenStore}`,
        },
      };
      const onAddRequestItem = () =>
        axios
          .post(apiUrl, tempRequestedItem, config)
          .then((response) => {
            const data = response.data;
            console.log("data");
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });

      onAddRequestItem();
    });

    updateRequestedItemsCartStore([]);
    navigation.navigate(baseScreenStore, { roomDetails: roomDetails });
    //navigation.goBack();
  };

  function toLocalISODate(date, timeZone) {
    // Create a formatter for the date parts
    const formatter = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      timeZone: timeZone,
      hour12: false,
    });

    // Format the date according to the given timezone and split into parts
    const parts = formatter.formatToParts(date);

    // Reduce parts to an easily accessible key-value map
    const dateParts = parts.reduce((acc, part) => {
      if (part.type !== "literal") {
        acc[part.type] = part.value;
      }
      return acc;
    }, {});

    // Construct the ISO string
    return `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}Z`;
  }
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
