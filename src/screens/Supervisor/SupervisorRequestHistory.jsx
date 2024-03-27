import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View, TouchableOpacity, Image } from "react-native";
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
import CalendarIcon from "../../SVG/CalendarIcon";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import axios from "axios";
import useBaseUrl from "../../hooks/useBaseUrl";

const SupervisorRequestHistory = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [requestDetailObject, setRequestDetailObject] = useState({});
  const [requestItems, setRequestItems] = useState([]);

  const baseUrl = useBaseUrl();


  const [isRequestDetailModalOpen, setIsRequestDetailModalOpen] =
    useState(false);

  const toggleRequestDetailModal = () =>
    setIsRequestDetailModalOpen(!isRequestDetailModalOpen);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  const onPress = ({ request }) => {
    setRequestDetailObject(request);
    setIsRequestDetailModalOpen(true);
  };

  useEffect(() => {
    fetchRequestItems().then((data) => {
      setRequestItems(data);
    });
  }, []);

  const fetchRequestItems = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/requestItems/all`);
        console.log("Request items:", response.data.filter((item) => item.status === "Approved"));
        return response.data;
    } catch (error) {
        console.error("Error fetching request items:", error);
        throw error;
    }
};


  const tabs = [{ label: " Supplies" }, { label: "Help" }];

  const goBack = () => {
    navigation.goBack();
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
                  <TouchableOpacity onPress={goBack}>
                    <BackIcon />
                  </TouchableOpacity>
                  <Typography variant="h5-black">History</Typography>
                </View>
              }
            />
          </SafeAreaView>
        </LinearGradient>
        <View style={{ flexDirection: "row"}}>

          <View style={styles.tabContainer}>
            <NavTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabPress={handleTabPress}
              justifyContent="center"
            />
            <View style={styles.bodyContent}>
              {activeTab === 0 ? (
                <View style={styles.horizontalContainer}>
                  <RequestItemHeaderComponent />
                  {requestItems.map((request, index) => (
                    <RequestItemHistory
                      key={index}
                      request={request}
                      onPress={() => onPress({ request: request })}
                    />
                  ))}
                </View>
              ) : (
                <View style={styles.horizontalContainer}>
                  <RequestItemHeaderComponent />
                  {requestItems.map((request, index) => (
                    <RequestItemHistory
                      key={index}
                      request={request}
                      onPress={() => onPress({ request: request })}
                    />
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      {isRequestDetailModalOpen && (
        <Modal
          visible={isRequestDetailModalOpen}
          onRequestClose={toggleRequestDetailModal}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.itemDetailModal}>
              <View style={{ gap: 16, width: "100%" }}>
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

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="small-black">Details</Typography>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <CalendarIcon />
                    <Typography variant="xs-medium">
                      {requestDetailObject.RequestedDateTime}
                    </Typography>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body-regular">Quantity</Typography>
                  <View
                    style={{
                      borderRadius: 100,
                      height: 28,
                      width: 28,
                      backgroundColor: colors.yellow1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="small-medium">
                      {requestDetailObject.Quantity}
                    </Typography>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body-regular">Room</Typography>
                  <Typography variant="small-medium">
                    {requestDetailObject.RoomName}
                  </Typography>
                </View>
                <View style={styles.itemDetailTitle}>
                  <Typography variant="small-black">Requester</Typography>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 6,
                  }}
                >
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
    flexGrow: 1,
    marginHorizontal: 26,
  },
  bodyContent: {
    paddingTop: 20,
    flexGrow: 1,
    // width: "100vw",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
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

export default SupervisorRequestHistory;
