import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import Typography from "../../components/Typography/Typography";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BigButton from "../../components/BigButton/BigButton";
import BedIcon from "../../SVG/BedIcon";
import { colors } from "../../../themes/themes";
import NavTabs from "../../components/NavTabs/NavTabs";
import { useBaseScreenStore } from "../../store/screensStore";
import useBaseUrl from "../../hooks/useBaseUrl";
import axios from "axios";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";
import CartIcon from "../../SVG/CartIcon";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";

const HousekeeperRequest = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPendingTab, setShowPendingTab] = useState(true);
  const tabs = [{ label: "Pending" }, { label: "History" }];
  const [items, setItems] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);
  const baseScreenStore = useBaseScreenStore((state) => state.baseScreenStore);
  const updateBaseScreenStore = useBaseScreenStore(
    (state) => state.updateBaseScreenStore,
  );
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
  // const pendingItems = [
  //   { id: "1", itemName: "Toilet Paper", date: "2024-03-01" },
  //   { id: "2", itemName: "Small Towel", date: "2024-03-05" },
  //   { id: "3", itemName: "Large Towel", date: "2024-03-10" },
  //   { id: "4", itemName: "Toilet Paper", date: "2024-03-15" },
  //   { id: "5", itemName: "Small Towel", date: "2024-03-20" },
  //   { id: "6", itemName: "Large Towel", date: "2024-03-20" },
  // ];

  // const historyItems = [
  //   { id: "1", itemName: "Mopping Set", date: "2024-03-01" },
  //   { id: "2", itemName: "Squeegee", date: "2024-03-05" },
  //   { id: "3", itemName: "Sponge", date: "2024-03-10" },
  //   { id: "4", itemName: "Mopping Set", date: "2024-03-15" },
  //   { id: "5", itemName: "Squeegee", date: "2024-03-20" },
  //   { id: "6", itemName: "Sponge", date: "2024-03-20" },
  // ];
  const onRoomSuppliesPressed = () => {
    // console.log("onRoomSuppliesPressed");
    navigation.navigate("RequestItemRoomSupplies", {
      roomDetails: [],
      items: [],
      screenTitle: "Room Supplies",
    });
  };

  const onCartSuppliesPressed = () => {
    console.log("onCartSuppliesPressed");
    navigation.navigate("RequestItemCartSupplies", {
      roomDetails: [],
      items: [],
      screenTitle: "Cart Supplies",
    });
  };

  const handleTabPress = (index) => {
    setActiveTab(index);

    if (index === 0) {
      setItems(pendingItems);
    } else {
      setItems(historyItems);
    }
  };

  const Item = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.n30,
        paddingVertical: 16,
      }}
    >
      <Typography variant="small-medium">{item.ItemName}</Typography>
      <Typography variant="small-medium" style={{ color: colors.n40}}>
        {new Date(item.RequestedDateTime.split("T")[0]).toLocaleDateString(
          "en-US",
          { month: "short", day: "2-digit", year: "numeric" },
        )}
      </Typography>
    </View>
  );

  const PastItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.n30,
        paddingVertical: 16,
      }}
    >
      <View
          style={[
            styles.itemColor,
            request.isCompleted
              ? styles.approvedItem
              : styles.declinedItem,
          ]}
        ></View>
      <Typography variant="small-medium">{item.ItemName}</Typography>
      <Typography variant="small-medium" style={{ color: colors.n40}}>
        {new Date(item.RequestedDateTime.split("T")[0]).toLocaleDateString(
          "en-US",
          { month: "short", day: "2-digit", year: "numeric" },
        )}
      </Typography>
    </View>
  );

  useEffect(() => {
    updateBaseScreenStore("HousekeeperRequest");

    const apiUrl = baseUrl + `/api/requestItems/all`;

    console.log(apiUrl);
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    const onFetchRequestItemsViewAll = () =>
      axios
        .get(apiUrl, config)
        .then((response) => {
          let data = response.data;
          let tempPendingItems = [];
          let tempHistoryItems = [];
          if (data.length > 0) {
            data.forEach((item) => {
              if (item.isCompleted) {
                tempHistoryItems.push(item);
              } else {
                tempPendingItems.push(item);
              }
            });
          }

          // console.log("data");
          // console.log(data);
          // console.log(tempPendingItems);
          // console.log(tempPendingItems);
          setItems(tempPendingItems);
          setPendingItems(tempPendingItems);
          setHistoryItems(tempHistoryItems);
        })
        .catch((error) => {
          console.log(error);
        });

    onFetchRequestItemsViewAll();
  }, []);

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
            <SupervisorRoomHeader title="Request Items" />
          </SafeAreaView>
        </LinearGradient>
        <View style={{ marginHorizontal:26}}>
        <Typography variant='title-regular' style={{alignSelf: "flex-start", marginHorizontal: 26,paddingVertical: 20}}>All you need in one place!</Typography>
        <View style={styles.topButtonsContainer}>
          <BigButton
            name="Room Supplies"
            icon={<BedIcon w="40" h="28" fill={colors.main} />}
            onPress={onRoomSuppliesPressed}
          />

          <BigButton
            name="Cart Supplies"
            icon={
              <CartIcon w="28" h="28" stroke={colors.main} fill={colors.main} />
            }
            onPress={onCartSuppliesPressed}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.navTabContainer}>
            <NavTabs
              screen="HousekeeperRequest"
              tabs={tabs}
              activeTab={activeTab}
              onTabPress={handleTabPress}
              justifyContent="space-around"
            />
            {items.length > 0 && (
              <FlatList
                data={items}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.requestItemId}
                style={{paddingVertical: 20,}}
              />
            )}
          </View>
        </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.n0,
  },
  headerContainer: {
    width: "100%",
    borderBottomLeftRadius: 60,
    paddingHorizontal: 26,
    paddingTop: 7,
  },
  topButtonsContainer: {
    marginHorizontal:26,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomContainer: {
    marginHorizontal:26,
  },
  itemColor: {
    width: 6,
    height: 54,
  },
  approvedItem: {
    backgroundColor: colors.pale_teal1,
  },
  declinedItem: {
    backgroundColor: colors.red,
  },
  pendingContainer: {},
  historyContainer: {},
});

export default HousekeeperRequest;
