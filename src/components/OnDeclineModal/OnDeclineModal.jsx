import React from "react";
import { Modal, View, Image } from "react-native";
import CloseIcon from "../../SVG/CloseIcon";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";


const OnDeclineModal = ({
  isOnDeclineModalOpen,
  toggleOnDeclineModal,
}) => {
  return (
    <Modal
      visible={isOnDeclineModalOpen}
      onRequestClose={toggleOnDeclineModal}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.contentLayout}>
          <View style={{ gap: 50, alignItems: "center" }}>
            <CloseIcon onPress={toggleOnDeclineModal} />
            <Typography variant="title-black">
                Decline
              </Typography>
              <Image
                source={require('../../../assets/illustrations/onDecline.png')}
                style={{ width: 130, height: 130}}
              />
              <Typography variant="body-regular" style={{marginHorizontal: 29,}}>The requests have been declined. We will notify your workers.</Typography>
              <Button name="Done" type="primary" onPress={toggleOnDeclineModal}/>
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
        paddingBottom: 50,
    },
    };

export default OnDeclineModal;
