// ConfirmationModal.js
import React from "react";
import { Modal, View, Text } from "react-native";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";

const ConfirmationModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10,gap:20 }}>
          <Typography>You want to delete this?</Typography>
          <View style={{ flexDirection: "row", justifyContent: "space-around",gap:20, marginTop: 20 }}>
            <Button name="Yes" type="tertiary" onPress={onCancel}  />
            <Button name="No"  type ="quaternary" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
