// RequestItemContainer.js
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import RequestItemHeaderComponent from "../../components/RequestItemHeaderComponent/RequestItemHeaderComponent";
import RequestItemComponent from "../../components/RequestItemComponent/RequestItemComponent";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";
import { acceptRequestItem, fetchRequestItems } from "../Utils/SupervisorApi";
import useBaseUrl from "../../hooks/useBaseUrl";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import Button from "../../components/Button/Button";
import { colors } from "../../../themes/themes";
import OnApprovalModal from "../../components/OnApprovalModal/OnApprovalModal";

const RequestItemContainer = ({ openItemDetailModal }) => {
  const [requestItems, setRequestItems] = useState([]);
  const [updatedRequestItems, setUpdatedRequestItems] = useState([]);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [isOnApprovalModalOpen, setIsOnApprovalModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const accessTokenStore = useAccessTokenStore(
    (state) => state.accessTokenStore,
  );
  const baseUrl = useBaseUrl();
  const [updated, setUpdated] = useState(false);

  const employeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.employeeDetailsStore,
  );

  useEffect(() => {
    fetchRequestItems(baseUrl, accessTokenStore).then((data) => {
      const filteredData = data.filter((item) => item.isCompleted === false);
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

  const toggleOnApprovalModal = () => {
    setIsOnApprovalModalOpen(!isOnApprovalModalOpen);
  }

  const handleConfirm = () => {
    // Check if a request is selected
    if (selectedRequest !== null) {
      // Check if the selected request is approved
      if (selectedRequest) {
        // If approved, call the acceptRequestItem function
        console.log(updatedRequestItems);
        acceptRequestItem(baseUrl, updatedRequestItems, accessTokenStore)
          .then(() => {
            // Clear the updated request items and perform additional logic after approval
            setUpdatedRequestItems([]);
            setUpdated(!updated);

            // Additional logic after approval
          })
          .catch((error) => {
            // Handle errors if acceptRequestItem fails
            console.error("Error accepting request:", error);
          });
      } else {
        // If declined, perform additional logic for decline
        // For example, you can update the request status or send a notification
        // Additional logic for decline
      }
    }

    // Close the confirmation modal regardless of the action
    setConfirmationModalVisible(false);
    setIsOnApprovalModalOpen(true);
  };

  const handleCancel = () => {
    setSelectedRequest(null);
    setConfirmationModalVisible(false);
  };

  const updateRequestCompletion = (updatedRequest) => {
    console.log(employeeDetailsStore.userId);
    const updatedItem = {
      requestItemId: updatedRequest.ID,
      assignedRoomID: updatedRequest.assignedRoomID,
      requestedItemId: updatedRequest.requestItemId,
      Quantity: updatedRequest.Quantity,
      Note: updatedRequest.Note,
      RequestItemDateTime: updatedRequest.RequestedDateTime,
      isCompleted: updatedRequest.isCompleted,
      ApprovedBySupervisorId: employeeDetailsStore.userId,
      requestItemStatus: updatedRequest.requestItemStatus,
    };

    let updatedItems = [...updatedRequestItems]; // Copy the existing updatedRequestItems array
    const indexToUpdate = updatedItems.findIndex(
      (item) => item.requestItemId === updatedRequest.requestItemId,
    );

    if (indexToUpdate !== -1) {
      updatedItems[indexToUpdate] = updatedItem; // Update the specific item in updatedItems array
    } else {
      // If the item is not found, add it to the array
      updatedItems.push(updatedItem);
    }

    setUpdatedRequestItems(updatedItems); // Update updatedRequestItems state
  };

  return (
    <View>
      <ScrollView
        style={{ height: "80.5%", marginBottom: 24, paddingHorizontal: 26 }}
      >
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
      <OnApprovalModal isOnApprovalModalOpen={isOnApprovalModalOpen} toggleOnApprovalModal={toggleOnApprovalModal}/>
      <View style={styles.buttonStyles}>
        <Button
          name="Approve"
          onPress={() => onPressApprove()}
          type="primary"
          style={{ width: "40%"}}
        />
        <Button
          name="Decline"
          onPress={() => onPressDecline()}
          type="secondary"
          style={{ width: "40%"}}
        />
      </View>
    </View>
  );
};

const styles = {
  buttonStyles: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 24,
    backgroundColor: colors.n10,
    borderTopWidth: 1,
    borderColor: colors.n20,
  },
};

export default RequestItemContainer;
