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
import NewCartIcon from "../../SVG/NewCartIcon";
import { useFocusEffect } from "@react-navigation/native";
import { format, parse } from "date-fns";

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

  const onRoomSuppliesPressed = () => {
    navigation.navigate("RequestItemRoomSupplies", {
      roomDetails: [],
      items: [],
      screenTitle: "Room Supplies",
    });
  };

  const onCartSuppliesPressed = () => {
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
        borderBottomColor: colors.n20,
        paddingVertical: 16,
      }}
    >
      <Typography variant="small-medium">{item.ItemName}</Typography>
      <Typography variant="small-medium" style={{ color: colors.n40 }}>
        {formatDate(item.RequestedDateTime)}
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
          request.isCompleted ? styles.approvedItem : styles.declinedItem,
        ]}
      ></View>
      <Typography variant="small-medium">{item.ItemName}</Typography>
      <Typography variant="small-medium" style={{ color: colors.n40 }}>
        {new Date(item.RequestedDateTime.split("T")[0]).toLocaleDateString(
          "en-US",
          { month: "short", day: "2-digit", year: "numeric" },
        )}
      </Typography>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      updateBaseScreenStore("HousekeeperRequest");

      const apiUrl = baseUrl + `/api/requestItems/all`;

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

            setItems(tempPendingItems);
            setPendingItems(tempPendingItems);
            setHistoryItems(tempHistoryItems);
          })
          .catch((error) => {
            console.log(error);
          });

      onFetchRequestItemsViewAll();

      // Return a no-op function if no clean-up is needed
      return () => {};
    }, []),
  );

  const formatDate = (RequestedDateTime) => {
    const localDate = new Date(RequestedDateTime);
    const today =
      localDate.getFullYear() +
      " " +
      String(localDate.getMonth() + 1).padStart(2, "0") +
      " " +
      String(localDate.getDate()).padStart(2, "0");

    // Parse the input string into a Date object (assuming YYYY MM DD format)
    const date = parse(today, "yyyy MM dd", new Date());

    // Format the Date object into a more readable form
    return format(date, "MMM dd, yyyy");
    return today;
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
            <SupervisorRoomHeader title="Request Items" />
          </SafeAreaView>
        </LinearGradient>
        <View style={{ marginHorizontal: 26 }}>
          <Typography
            variant="title-regular"
            style={{
              alignSelf: "flex-start",
              marginHorizontal: 26,
              paddingVertical: 20,
            }}
          >
            All you need in one place!
          </Typography>
          <View style={styles.topButtonsContainer}>
            <BigButton
              name="Room Supplies"
              icon={<BedIcon w="40" h="28" fill={colors.main} />}
              onPress={onRoomSuppliesPressed}
            />

            <BigButton
              name="Cart Supplies"
              icon={
                <NewCartIcon
                  w="34.5"
                  h="32"
                  stroke={colors.main}
                  fill={colors.main}
                />
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
                  style={{ paddingVertical: 20 }}
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
    paddingVertical: 22,
    paddingTop: 7,
  },
  topButtonsContainer: {
    marginHorizontal: 26,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomContainer: {
    marginHorizontal: 26,
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
