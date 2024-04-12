// ConfirmationModal.js
import React from "react";
import { Modal, View, Text } from "react-native";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";

const ConfirmationModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 35,
            paddingVertical: 26,
            borderRadius: 20,
            width: "70%",
            alignItems: "center",
          }}
        >
          <Typography variant="title-regular">Approve all item(s)?</Typography>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 20,
              marginTop: 20,
            }}
          >
            <Button name="Yes" type="tertiary" onPress={onCancel} />
            <Button name="No" type="quaternary" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
