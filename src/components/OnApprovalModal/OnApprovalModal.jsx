import React from "react";
import { Modal, View, Image } from "react-native";
import CloseIcon from "../../SVG/CloseIcon";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";


const OnApprovalModal = ({
  isOnApprovalModalOpen,
  toggleOnApprovalModal,
}) => {
  return (
    <Modal
      visible={isOnApprovalModalOpen}
      onRequestClose={toggleOnApprovalModal}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.contentLayout}>
          <View style={{ gap: 20, alignItems: "center" }}>
            <CloseIcon onPress={toggleOnApprovalModal} />
            <Typography variant="title-black">
                Hurray!
              </Typography>
              <Image
                source={require('../../../assets/illustrations/onApproval.png')}
                style={{ width: 97, height: 140, marginVertical:13, }}
              />
              <Typography variant="body-regular">The requests have been accepted. We will notify your workers.</Typography>
              <Button name="Done" type="primary" onPress={toggleOnApprovalModal} style={{marginVertical: 30}}/>
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
    contentLayout: {
        backgroundColor: "white",
        width: "90%",
        paddingHorizontal: 30,
        paddingVertical: 16,
        borderRadius: 20,
    },
    };

export default OnApprovalModal;
