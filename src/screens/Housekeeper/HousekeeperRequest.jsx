import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import Typography from "../../components/Typography/Typography";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BigButton from "../../components/BigButton/BigButton";
import BedIcon from "../../SVG/BedIcon";
import { colors } from "../../../themes/themes";
import NavTabs from "../../components/NavTabs/NavTabs";

const HousekeeperRequest = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPendingTab, setShowPendingTab] = useState(true);
  const tabs = [{ label: "Pending" }, { label: "History" }];
  const [items, setItems] = useState([]);
  const pendingItems = [
    { id: "1", itemName: "Toilet Paper", date: "2024-03-01" },
    { id: "2", itemName: "Small Towel", date: "2024-03-05" },
    { id: "3", itemName: "Large Towel", date: "2024-03-10" },
    { id: "4", itemName: "Toilet Paper", date: "2024-03-15" },
    { id: "5", itemName: "Small Towel", date: "2024-03-20" },
    { id: "6", itemName: "Large Towel", date: "2024-03-20" },
  ];

  const historyItems = [
    { id: "1", itemName: "Mopping Set", date: "2024-03-01" },
    { id: "2", itemName: "Squeegee", date: "2024-03-05" },
    { id: "3", itemName: "Sponge", date: "2024-03-10" },
    { id: "4", itemName: "Mopping Set", date: "2024-03-15" },
    { id: "5", itemName: "Squeegee", date: "2024-03-20" },
    { id: "6", itemName: "Sponge", date: "2024-03-20" },
  ];
  const onRoomSuppliesPressed = () => {
    console.log("onRoomSuppliesPressed");
  };

  const onCartSuppliesPressed = () => {
    console.log("onCartSuppliesPressed");
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
        borderBottomColor: colors.n40,
        paddingVertical: 16,
        marginHorizontal: 36,
      }}
    >
      <Typography variant="small-medium">{item.itemName}</Typography>
      <Typography variant="small-medium">{item.date}</Typography>
    </View>
  );

  useEffect(() => {
    setItems(pendingItems);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Typography variant="h5-black">Request Items</Typography>
          <Typography variant="body-regular">
            All you need in one Place!
          </Typography>
          <View style={styles.topButtonsContainer}>
            <BigButton
              name="Room Supplies"
              icon={<BedIcon w="40" h="28" fill={colors.orange} />}
              onPress={onRoomSuppliesPressed}
            />

            <BigButton
              name="Cart Supplies"
              icon={<BedIcon w="40" h="28" fill={colors.orange} />}
              onPress={onCartSuppliesPressed}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.navTabContainer}>
            <NavTabs
              screen="HousekeeperRequest"
              tabs={tabs}
              activeTab={activeTab}
              onTabPress={handleTabPress}
            />
            <FlatList
              data={items}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topContainer: {
    rowGap: 6,
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottomContainer: {},
  navTabContainer: {
    // borderColor: "black",
    // borderWidth: 1,
  },
  pendingContainer: {},
  historyContainer: {},
});

export default HousekeeperRequest;
