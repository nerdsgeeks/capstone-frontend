// RequestItemContainer.js
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import RequestItemHeaderComponent from "../../components/RequestItemHeaderComponent/RequestItemHeaderComponent";
import RequestItemComponent from "../../components/RequestItemComponent/RequestItemComponent";
import { useAccessTokenStore } from "../../store/employeeStore";
import { acceptRequestItem, fetchRequestItems } from "../Utils/SupervisorApi";
import useBaseUrl from "../../hooks/useBaseUrl";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import Button from "../../components/Button/Button";

const RequestItemContainer = ({ openItemDetailModal }) => {
  const [requestItems, setRequestItems] = useState([]);
  const [updatedRequestItems, setUpdatedRequestItems] = useState([]);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const accessTokenStore = useAccessTokenStore(
    (state) => state.accessTokenStore,
  );
  const baseUrl = useBaseUrl();

  useEffect(() => {
    fetchRequestItems(baseUrl, accessTokenStore).then((data) => {
      const filteredData = data.filter((item) => item.isCompleted === false);
      setRequestItems(filteredData);
    });
  }, []);

  const onPressApprove = (request) => {
    setSelectedRequest(request);
    setConfirmationModalVisible(true);
  };

  const onPressDecline = (request) => {
    setSelectedRequest(request);
    setConfirmationModalVisible(true);
  };

  const handleConfirm = () => {
    if (selectedRequest) {
      if (selectedRequest.approved) {
        acceptRequestItem(baseUrl, updatedRequestItems, accessTokenStore).then(
          () => {
            setUpdatedRequestItems([]);
            // Additional logic after approval
          },
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
    const indexToUpdate = requestItems.findIndex(
      (request) => request.ID === updatedRequest.ID,
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
          <RequestItemComponent
            key={index}
            request={request}
            onPress={() => openItemDetailModal(request)}
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
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
};

export default RequestItemContainer;
