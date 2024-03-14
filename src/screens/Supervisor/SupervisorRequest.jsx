import React, { useState } from "react";
import { Modal, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Typography from "../../components/Typography/Typography";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HistoryIcon from "../../SVG/HistoryIcon";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../themes/themes";
import NavTabs from "../../components/NavTabs/NavTabs";
import RequestItemComponent from "../../components/RequestItemComponent/RequestItemComponent";
import Button from "../../components/Button/Button";
import RequestItemHeaderComponent from "../../components/RequestItemHeaderComponent/RequestItemHeaderComponent";
import CloseIcon from "../../SVG/CloseIcon";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import CalendarIcon from "../../SVG/CalendarIcon";

const SupervisorRequest = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isConfimationModalOpen, setIsConfimationModalOpen] = useState(false);
  const [isCancelAllRequest, setIsCancelAllRequest] = useState(false);
  const [requestDetailObject, setRequestDetailObject] = useState({});

  const [isRequestDetailModalOpen, setIsRequestDetailModalOpen] =
    useState(false);

  const toggleRequestDetailModal = () =>
    setIsRequestDetailModalOpen(!isRequestDetailModalOpen);

  const toggleConfimationModal = () => {
    setIsConfimationModalOpen(!isConfimationModalOpen);
  };

  const onPressApprove = () => {
    setIsConfimationModalOpen(true);
    setIsCancelAllRequest(false);
  };

  const onPressDecline = () => {
    setIsConfimationModalOpen(true);
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

  const onPress = ({ request }) => {
    setRequestDetailObject(request);
    setIsRequestDetailModalOpen(true);
    // navigation.navigate("RequestDetail", { request });
  };
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
              title="Pending Requests"
              icon={
                <TouchableOpacity onPress={pressedIcon}>
                  <HistoryIcon />
                </TouchableOpacity>
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
                  <RequestItemComponent
                    key={index}
                    request={request}
                    onPress={() => onPress({ request: request })}
                  />
                ))}
              </View>
            ) : (
              <View>
                <RequestItemHeaderComponent />
                {cleanerSupplies.map((request, index) => (
                  <RequestItemComponent
                    key={index}
                    request={request}
                    onPress={() => onPress({ request: request })}
                  />
                ))}
              </View>
            )}
          </View>
          <View style={styles.buttonStyles}>
            <Button name="Decline" onPress={onPressDecline} type="secondary" />
            <Button name="Approve" onPress={onPressApprove} type="primary" />
          </View>
        </View>
      </View>
      {isConfimationModalOpen && (
        <Modal
          visible={isConfimationModalOpen}
          onRequestClose={toggleConfimationModal}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <CloseIcon onPress={toggleConfimationModal} />
              <View style={styles.ConfimationModalContainer}>
                <Typography variant="body-regular">
                  {isCancelAllRequest
                    ? "Do you want to decline the request(s)?"
                    : "Do you want to approve the request(s)?"}
                </Typography>
                <View style={styles.buttonStyles}>
                  <Button
                    name="No"
                    type="secondary"
                    onPress={toggleConfimationModal}
                  />
                  <Button
                    name="Yes"
                    type="primary"
                    onPress={
                      isCancelAllRequest ? onCancelAllRequests : onPressApprove
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {isRequestDetailModalOpen && (
        <Modal
          visible={isRequestDetailModalOpen}
          onRequestClose={toggleRequestDetailModal}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.itemDetailModal}>
              <View style={{ gap: 16, width: '100%' }}>
                <CloseIcon onPress={toggleRequestDetailModal} />
                <View style={styles.imageContainer}>
                  <Image
                    source={require("./../../../assets/request-help-modal-image.png")}
                    style={{ height: 160, aspectRatio: 1 }}
                  />
                  <Typography variant="small-medium">
                    {requestDetailObject.itemName}
                  </Typography>
                </View>

                {requestDetailObject.comments && (
                  <View style={styles.notes}>
                    <Typography variant="small-medium">Notes</Typography>
                    <Typography variant="small-regular">
                      {"\u2022"} {requestDetailObject.comments}
                    </Typography>
                  </View>
                )}

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Typography variant="small-black">Details</Typography>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <CalendarIcon />
                    <Typography variant="xs-medium">
                      {requestDetailObject.date}
                    </Typography>
                  </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body-regular">Quantity</Typography>
                  <View style={{ borderRadius: 100, height: 28, width: 28, backgroundColor: colors.yellow1,alignItems: "center", justifyContent: "center" }} >
                    <Typography variant="small-medium">
                      {requestDetailObject.quantity}
                    </Typography>
                  </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Typography variant="body-regular">Room</Typography>
                  <Typography variant="small-medium">
                    {requestDetailObject.roomNumber}
                  </Typography>
                </View>
                <View style={styles.itemDetailTitle}>
                  <Typography variant="small-black">Requester</Typography>
                </View>
                <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 6 }}>
                  <Image
                    style={{ borderRadius: 15, width: 30, height: 30 }}
                    source={{
                      uri: "https://reactnative.dev/img/tiny_logo.png",
                    }}
                  />
                  
                    <Typography variant="xs-regular">
                      {requestDetailObject.requester}
                    </Typography>
                  
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
    marginHorizontal: 26,
  },
  bodyContent: {
    paddingTop: 20,
  },
  buttonStyles: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
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
  ConfimationModalContainer: {
    alignItems: "center",
  },
  itemDetailModal: {
    flexGrow: 1,
    margin: 15,
    backgroundColor: colors.n0,
    borderRadius: 20,
    paddingHorizontal: 26,
    paddingVertical: 15,
    alignItems: "center",
  },
  imageContainer: {
alignItems: "center",
gap: 10,
  },
  notes: {
    padding: 10,
    backgroundColor: colors.pale_teal2,
    borderRadius: 8,
  },
});

export default SupervisorRequest;
