import React, { useState } from "react";
import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import Typography from "../../components/Typography/Typography";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "../../SVG/BackIcon";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../themes/themes";
import NavTabs from "../../components/NavTabs/NavTabs";
import RequestItemHistory from "../../components/RequestItemHistory/RequestItemHistory";
import Button from "../../components/Button/Button";
import RequestItemHeaderComponent from "../../components/RequestItemHeaderComponent/RequestItemHeaderComponent";
import CloseIcon from "../../SVG/CloseIcon";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";

const SupervisorRequest = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setModalState] = useState(false);

  const toggleModal = () => setModalState(!isModalOpen);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  const roomSupplies = [
    {
      itemName: "Toilet Paper",
      quantity: 2,
      roomNumber: 101,
      date: "2022-01-01",
      itemType: "Toilet Paper",
      requester: "John Doe",
      requesterId: "12345",
      comments: "I need a toilet paper",
    },
    { itemName: "Hand Soap", quantity: 1, roomNumber: 102, date: "2022-01-01" },
    { itemName: "Towels", quantity: 3, roomNumber: 103, date: "2022-01-01" },
  ];

  const cleanerSupplies = [
    { itemName: "Bleach", quantity: 2, roomNumber: 101, date: "2022-01-01" },
    { itemName: "Mop", quantity: 1, roomNumber: 102, date: "2022-01-01" },
    { itemName: "Bucket", quantity: 3, roomNumber: 103, date: "2022-01-01" },
  ];

  const tabs = [{ label: "Room Supplies" }, { label: "Cleaner Supplies" }];

  const pressedIcon = () => {
    console.log("icon pressed!");
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.main, "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
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
                  <TouchableOpacity>
                    <BackIcon />
                  </TouchableOpacity>
                  <Typography variant="h5-black">History</Typography>
                </View>
              }
            />
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.tabContainer}>
          <NavTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabPress={handleTabPress}
          />
          <View style={styles.bodyContent}>
            {activeTab === 0 ? (
              <View>
                <RequestItemHeaderComponent />
                {roomSupplies.map((request, index) => (
                  <RequestItemHistory
                    key={index}
                    request={request}
                    onPress={toggleModal}
                  />
                ))}
              </View>
            ) : (
              <View>
                <RequestItemHeaderComponent />
                {cleanerSupplies.map((request, index) => (
                  <RequestItemHistory
                    key={index}
                    request={request}
                    onPress={toggleModal}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
      <Modal
        visible={isModalOpen}
        onRequestClose={toggleModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <CloseIcon onPress={toggleModal} />
            <Typography variant="h5-black">This is my modal</Typography>
          </View>
        </View>
      </Modal>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerContainer: {
    width: "100%",
    borderBottomLeftRadius: 60,
    paddingHorizontal: 26,
    paddingTop: 7,
  },
  tabContainer: {
    marginTop: 10,
    // width: "100%",
    marginHorizontal: 26,
  },
  bodyContent: {
    paddingTop: 20,
    flexGrow: 1,
    // width: "100vw",
  },
});

export default SupervisorRequest;
