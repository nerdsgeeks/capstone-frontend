import React from "react";
import { Modal, View, Image } from "react-native";
import CloseIcon from "../../SVG/CloseIcon";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";


const onDeclineModal = ({
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
          <View style={{ gap: 16, width: "100%" }}>
            <CloseIcon onPress={toggleOnDeclineModal} />
            <Typography variant="title-black">
                Hurray!
              </Typography>
              <Image
                source={require('../../../assets/illustrations/onDecline.png')}
                style={{ width: 97, height: 140 }}
              />
              <Typography variant="body-regular">The requests have been declined. We will notify your workers.</Typography>
              <Button name="done" type="primary" onPress={toggleOnDeclineModal}/>
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

export default onDeclineModal;
