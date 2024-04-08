import React from "react";
import { Modal, View, Image } from "react-native";
import CloseIcon from "../../SVG/CloseIcon";
import Typography from "../Typography/Typography";
import CalendarIcon from "../../SVG/CalendarIcon";
import { colors } from "../../../themes/themes";


const RequestModalSupervisor = ({
  isRequestDetailModalOpen,
  toggleRequestDetailModal,
  requestDetailObject,
}) => {
  return (
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
                source={{ uri: requestDetailObject.ImageUrl}}
                style={{ height: 160, aspectRatio: 1 }}
              />
              <Typography variant="small-medium">
                {requestDetailObject.ItemName}
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
                  {new Date(requestDetailObject.RequestedDateTime).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
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
                {requestDetailObject.firstName} {requestDetailObject.lastName} 
              </Typography>
            </View>
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
    },
    itemDetailTitle: {
        marginTop: 16,
    },
    };

export default RequestModalSupervisor;
