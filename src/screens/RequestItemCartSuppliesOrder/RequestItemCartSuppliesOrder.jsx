import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CartIcon from "../../SVG/CartIcon";
import BackIcon from "../../SVG/BackIcon";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../../themes/themes";
import Button from "../../components/Button/Button";
import {
  useRequestCartStore,
  useRequestCartSuppliesStore,
} from "../../store/requestStore";
import RequestedItemsList from "../../components/RequestedItemsList/RequestedItemsList";
import useBaseUrl from "../../hooks/useBaseUrl";
import axios from "axios";
import { useBaseScreenStore } from "../../store/screensStore";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";

const RequestItemCartSuppliesOrder = ({ route, navigation }) => {
  const { roomDetails } = route.params;
  const requestedItemsCartSuppliesStore = useRequestCartSuppliesStore(
    (state) => state.requestedItemsCartSuppliesStore,
  );
  const updateRequestedItemsCartSuppliesStore = useRequestCartSuppliesStore(
    (state) => state.updateRequestedItemsCartSuppliesStore,
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
    const currentDateTimeStamp = new Date().toISOString();
    const apiUrl = baseUrl + "/api/requestItems/addRequestItem";
    console.log(requestedItemsCartSuppliesStore);

    requestedItemsCartSuppliesStore.forEach((item, index) => {
      // Your logic here
      const tempRequestedItem = {
        assignedRoomID: 0,
        RequestedItemID: item.RequestedItemID,
        Quantity: item.count,
        Note: item.Note,
        RequestedDateTime: currentDateTimeStamp,
        isCompleted: false,
        approvedBySupervisorID: 0,
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

    updateRequestedItemsCartSuppliesStore([]);
    navigation.navigate(baseScreenStore, { roomDetails: roomDetails });
    //navigation.goBack();
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
                  <Typography variant="h4-medium">Shopping Cart</Typography>
                </View>
              }
            />
          </SafeAreaView>
        </LinearGradient>
        {/* <Text> {requestedItemsCartSuppliesStore.length}</Text> */}
        {/* <Text>RequestItemCartSuppliesOrder</Text> */}
        <View style={{ flexDirection: "column", rowGap: 20 }}>
          <RequestedItemsList
            items={requestedItemsCartSuppliesStore}
            showRequestedItemText={false}
          ></RequestedItemsList>

          <Button type="primary" name="Order" onPress={onOrderPressed} />

          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default RequestItemCartSuppliesOrder;

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
    paddingVertical: 22,
    paddingTop: 7,
  },
});
