import React from "react";
import { Modal, View, Image } from "react-native";
import CloseIcon from "../../SVG/CloseIcon";
import Typography from "../Typography/Typography";
import CalendarIcon from "../../SVG/CalendarIcon";
import { colors } from "../../../themes/themes";

const RequestHelpModal = ({ isModalOpen, closeModal, helpRequestDetails }) => {
  return (
    <Modal
      visible={isModalOpen}
      onRequestClose={closeModal}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.itemDetailModal}>
          <View style={{ gap: 16, width: "100%" }}>
            <CloseIcon onPress={closeModal} />
            {/* <View style={styles.imageContainer}>
              <Image
                source={helpRequestDetails.RoomImageUrl }
                style={{ height: 160, aspectRatio: 1 }}
              />
              <Typography variant="h5-medium">
                {helpRequestDetails.RequestName}
              </Typography>
            </View> */}

            {helpRequestDetails.helperRequestedAdditionalNotes && (
              <View style={styles.notes}>
                <Typography variant="title-medium">Type of Request:</Typography>
                <Typography variant="title-regular">
                  {"\u2022"} {helpRequestDetails.helperRequestedAdditionalNotes}
                </Typography>
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5-black">Details</Typography>
              <View style={{ flexDirection: "row", gap: 6 }}>
                <CalendarIcon />
                <Typography variant="body-medium">
                  {new Date(helpRequestDetails.startTime).toLocaleDateString(
                    "en-US",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )}
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
              <Typography variant="title-regular">Quantity</Typography>
              <View
                style={{
                  borderRadius: 100,
                  height: 32,
                  width: 32,
                  backgroundColor: colors.yellow1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body-medium">NA</Typography>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="title-regular">Room</Typography>
              <Typography variant="title-medium">
                {helpRequestDetails.RoomName}
              </Typography>
            </View>

            {helpRequestDetails.firstName && (
              <View style={{ gap: 16 }}>
                <View style={styles.itemDetailTitle}>
                  <Typography variant="h5-black">Requester</Typography>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 6,
                  }}
                >
                  <Image
                    style={{ borderRadius: 45, width: 45, height: 45 }}
                    source={{
                      uri: helpRequestDetails.employeeImageURL,
                    }}
                  />
                  <Typography variant="body-regular">
                    {helpRequestDetails.firstName} {helpRequestDetails.lastName}
                  </Typography>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  itemDetailModal: {
    backgroundColor: "white",
    width: "90%",
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 8,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  notes: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: colors.pale_teal2,
    padding: 10,
    borderRadius: 8,
    gap: 6,
  },
  itemDetailTitle: {
    marginTop: 16,
  },
};

export default RequestHelpModal;
