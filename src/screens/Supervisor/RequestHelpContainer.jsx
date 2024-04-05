import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import RequestItemHeaderComponent from "../../components/RequestItemHeaderComponent/RequestItemHeaderComponent";
import { useAccessTokenStore,useEmployeeDetailsStore } from "../../store/employeeStore";
import { acceptRequestHelp, fetchRooms } from "../Utils/SupervisorApi"; // Corrected backend calls
import useBaseUrl from "../../hooks/useBaseUrl";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import Button from "../../components/Button/Button";
import RequestHelpComponent from "../../components/RequestHelpComponent/RequestHelpComponent";

const RequestHelpContainer = ({ openHelpDetailModal }) => {
  const [requestItems, setRequestItems] = useState([]);
  const [updatedRequestItems, setUpdatedRequestItems] = useState([]);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [selectedRequest, setSelectedRequest] = useState();
  const accessTokenStore = useAccessTokenStore(
    (state) => state.accessTokenStore
  );
  const baseUrl = useBaseUrl();
  const [updated, setUpdated] = useState(false);

  const employeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.employeeDetailsStore,
  );

  useEffect(() => {
    fetchRooms(baseUrl, accessTokenStore).then((data) => { 
      const filteredData = data.filter((room) => room.isHelperRequested === true && room.isHelperRequestedApproved === false);
      setRequestItems(filteredData);
    });
  }, [updated]);

  const onPressApprove = () => {
    setSelectedRequest(true);
    setConfirmationModalVisible(true);
  };

  const onPressDecline = () => {
    setSelectedRequest(false);
    setConfirmationModalVisible(true);
  };

  const handleConfirm = () => {
    if (selectedRequest!==null) {
      if (selectedRequest) {
        console.log(updatedRequestItems)
        acceptRequestHelp(baseUrl, updatedRequestItems, accessTokenStore).then( // Corrected backend call
          () => {
            setUpdatedRequestItems([]);
            setUpdated(!updated);
            // Additional logic after approval

          }
        );
      } else {
        // Additional logic for decline
      }
    }
    setConfirmationModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedRequest(null);
    setConfirmationModalVisible(false);
  };

  const updateRequestCompletion = (updatedRequest) => {
    console.log(updatedRequest);
    const indexToUpdate = requestItems.findIndex(
      (request) => request.ID === updatedRequest.ID
    );
    const updatedItems = [...requestItems];
    updatedItems[indexToUpdate] = updatedRequest;
    setRequestItems(updatedItems);
    setUpdatedRequestItems(updatedItems);
  };

  return (
    <>
      <ScrollView>
        <RequestItemHeaderComponent />
        {requestItems.map((request, index) => (
          <RequestHelpComponent
            key={index}
            request={request}
            onPress={() => openHelpDetailModal(request)}
            updateRequestCompletion={updateRequestCompletion}
          />
        ))}
      </ScrollView>
      <ConfirmationModal
        visible={confirmationModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
      <View style={styles.buttonStyles}>
        <Button
          name="Approve"
          onPress={() => onPressApprove(selectedRequest)}
          type="primary"
        />
        <Button
          name="Decline"
          onPress={() => onPressDecline(selectedRequest)}
          type="secondary"
        />
      </View>
    </>
  );
};

const styles = {
  buttonStyles: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
};

export default RequestHelpContainer;