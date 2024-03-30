// ConfirmationModal.js
import React from "react";
import { Modal, View, Text, Button } from "react-native";

const ConfirmationModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
          <Text>Are you sure you want to proceed?</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Confirm" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
