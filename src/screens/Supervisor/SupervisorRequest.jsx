import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
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
import useBaseUrl from "../../hooks/useBaseUrl";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import CalendarIcon from "../../SVG/CalendarIcon";
import axios from "axios";
import RequestModalSupervisor from "../../components/RequestModalSupervisor/RequestModalSupervisor";
import RequestHelpComponent from "../../components/RequestHelpComponent/RequestHelpComponent";
import RequestHelpHeaderComponent from "../../components/RequestHelpHeader/RequestHelpHeaderComponent";

const SupervisorRequest = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isConfimationModalOpen, setIsConfimationModalOpen] = useState(false);
  const [isCancelAllRequest, setIsCancelAllRequest] = useState(false);
  const [requestItems, setRequestItems] = useState([]);
  const baseUrl = useBaseUrl();
  const [requestDetailObject, setRequestDetailObject] = useState({});
  const [updateValue, setUpdateValue] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [isRequestDetailModalOpen, setIsRequestDetailModalOpen] =
    useState(false);
  const [isRequestHelpModalOpen, setIsRequestHelpModalOpen] = useState(false);
    const [updatedRequestItems, setUpdatedRequestItems] = useState([]);
    const [toggleFetch, setToggleFetch] = useState(false);


  

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

  useEffect(() => {
    fetchRequestItems().then((data) => {
      setRequestItems(data);

    },)
    fetchRooms().then((data) => {
      setRooms(data);
    })
    
  },[toggleFetch], []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/assignedRooms/all`);
      return response.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  }

  const updateRequestCompletion = (updatedRequest) => {
    const updateRequest = requestItems.findIndex((request) => request.ID === updatedRequest.ID);
    const updatedRequestItems = [...requestItems];
    updatedRequestItems[updateRequest] = updatedRequest;
    setRequestItems(updatedRequestItems);
  };
  const fetchRequestItems = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/requestItems/all`);
        console.log(response.data.filter((item) => item.isCompleted === false));
        return response.data;
    } catch (error) {
        console.error("Error fetching request items:", error);
        throw error;
    }
};

  const acceptRequest = () => {
    const requestData = requestItems.map(item => ({
      ID: item.ID,
      assignedRoomID: item.assignedRoomID,
      RequestedItemID: item.requestItemId,
      Quantity: item.Quantity,
      Note: item.Note,
      RequestedDateTime: item.RequestedDateTime,
      isCompleted: item.isCompleted,
      approvedBySupervisorID: item.approvedBySupervisorID
    }));
    axios
      .put(`${baseUrl}/api/requestItems/updateRequestItem`, requestData)
      .then((response) => {
        setToggleFetch(prevState => !prevState); 
        console.log(toggleFetch)
        setIsConfimationModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating request items:", error);
        // Handle error
      });
  };

  const onPress = ({ request }) => {
    setRequestDetailObject(request);
    setIsRequestDetailModalOpen(true);
    // navigation.navigate("RequestDetail", { request });
  };
  const tabs = [{ label: "Supplies" }, { label: "Help" }];

  const pressedIcon = () => {
    navigation.navigate("SupervisorRequestHistory");
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
          <>
            <NavTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabPress={handleTabPress}
            />

            <View style={styles.bodyContent}>
            <ScrollView style={styles.ScrollView}>

              {activeTab === 0 ? (
                <View>
                  <RequestItemHeaderComponent />
                  {requestItems &&
                    requestItems.map((request, index) => (
                      <RequestItemComponent
                        key={index}
                        request={request}
                        onPress={() => onPress({ request: request })}
                        updateRequestCompletion={updateRequestCompletion}
                      />
                    ))}
                </View>
              ) : (
                <View>
                  <RequestHelpHeaderComponent />
                  {rooms &&
                    rooms.map((request, index) => (
                      <RequestHelpComponent
                        key={index}
                        request={request}
                        onPress={() => onPress({ request: request })}
                      />
                    ))}
                </View>
              )}
                      </ScrollView>
              <View style={styles.buttonStyles}>
                <Button
                  name="Approve"
                  onPress={onPressApprove}
                  type="primary"
                />
                <Button
                  name="Decline"
                  onPress={onPressDecline}
                  type="secondary"
                />
              </View>
            </View>
          </>
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
                    onPress={acceptRequest
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {isRequestDetailModalOpen && (
        <RequestModalSupervisor
  isRequestDetailModalOpen={isRequestDetailModalOpen}
  toggleRequestDetailModal={toggleRequestDetailModal}
  requestDetailObject={requestDetailObject}
/>      )}

  {isRequestHelpModalOpen && (
        <RequestModalSupervisor
           isRequestDetailModalOpen={isRequestHelpModalOpen}
            toggleRequestDetailModal={setIsRequestHelpModalOpen}
            requestDetailObject={requestDetailObject}
          />
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
  ScrollView: {
    maxHeight: "80%",
  },
});

export default SupervisorRequest;
