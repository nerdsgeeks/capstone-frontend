import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Typography from "../../components/Typography/Typography";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ClockIcon from "../../SVG/ClockIcon";
import NavTabs from "../../components/NavTabs/NavTabs";
import RequestItemComponent from "../../components/RequestItemComponent/RequestItemComponent";
import Button from "../../components/Button/Button";
import RequestItemHeaderComponent from "../../components/RequestItemHeaderComponent/RequestItemHeaderComponent";
import CloseIcon from "../../SVG/CloseIcon";

const SupervisorRequest = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isRequestHelpModalOpen, setIsRequestHelpModalOpen] = useState(false);
  const [isCancelAllRequest, setIsCancelAllRequest] = useState(false);

  const toggleRequestHelpModal = () => {
    setIsRequestHelpModalOpen(!isRequestHelpModalOpen);
  };

  const onPressApprove = () => {
    setIsRequestHelpModalOpen(true);
    setIsCancelAllRequest(false);
  };

  const onPressDecline = () => {
    setIsRequestHelpModalOpen(true);
    setIsCancelAllRequest(true);
  };

  const resetCancelAllRequest = () => {
    setIsCancelAllRequest(false);
  };

  const onCancelAllRequests = () => {
    resetCancelAllRequest();
  };

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  const roomSupplies = [
    { itemName: "Toilet Paper", quantity: 2, roomNumber: 101, date: "2022-01-01", itemType: "Toilet Paper", requester: "John Doe", requesterId: "12345", comments: "I need a toilet paper" },
    { itemName: "Hand Soap", quantity: 1, roomNumber: 102, date: "2022-01-01" },
    { itemName: "Towels", quantity: 3, roomNumber: 103, date: "2022-01-01" }
  ];

  const cleanerSupplies = [
    { itemName: "Bleach", quantity: 2, roomNumber: 101, date: "2022-01-01" },
    { itemName: "Mop", quantity: 1, roomNumber: 102, date: "2022-01-01" },
    { itemName: "Bucket", quantity: 3, roomNumber: 103, date: "2022-01-01" }
  ];

  const onPress = ({ request }) => {
    navigation.navigate("RequestDetail", { request });
  };
  const tabs = [{ label: "Room Supplies" }, { label: "Cleaner Supplies" }];


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Typography variant="h5-black" style={styles.headerStyle}>
              Pending Request
            </Typography>
            <ClockIcon />
          </View>
          <View style={styles.tabContainer}>
            <>
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
                      <RequestItemComponent key={index} request={request} onPress={() => onPress({ request: request })} />
                    ))}
                  </View>
                ) : (
                  <View>
                    <RequestItemHeaderComponent />
                    {cleanerSupplies.map((request, index) => (
                      <RequestItemComponent key={index} request={request} onPress={() => onPress({ request: request })} />
                    ))}
                  </View>
                )}

                <View style={styles.buttonStyles}>
                  <Button name="Approve" onPress={onPressApprove} type="primary" />
                  <Button name="Decline" onPress={onPressDecline} type="secondary" />
                </View>
              </View>
            </>
          </View>
        </View>
      </SafeAreaView>
      {isRequestHelpModalOpen && (
        <Modal
          visible={isRequestHelpModalOpen}
          onRequestClose={toggleRequestHelpModal}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <CloseIcon onPress={toggleRequestHelpModal} />
              <View style={styles.requestHelpModalContainer}>
                <Typography variant="title-black">
                  {isCancelAllRequest ? "Do you want to cancel all requests?" : "Do you want to confirm all?"}
                </Typography>
                <View style={styles.requestHelpModalButtonContainer}>
                  <Button name="Approve" type="primary" onPress={isCancelAllRequest ? onCancelAllRequests : onPressApprove} />
                  <Button name="No" type="secondary" onPress={toggleRequestHelpModal} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  tabContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  bodyContent: {
    marginTop: 20,
  },
  buttonStyles: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  requestHelpModalContainer: {
    alignItems: "center",
  },
  requestHelpModalButtonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
});

export default SupervisorRequest;
