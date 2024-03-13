import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import CloseIcon from "./SVG/CloseIcon";

const TestModal = () => {
  const [isModalOpen, setModalState] = useState(false);

  const toggleModal = () => setModalState(!isModalOpen);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.openButton}>
        <Text>Test Modal</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalOpen}
        onRequestClose={toggleModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <CloseIcon onPress={toggleModal} />
            <Text style={styles.modalTitle}>This is my modal</Text>
            <Text>
              This is an example modal content. Repeat this content as needed to
              simulate your actual content.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "10px",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  closeIcon: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  openButton: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default TestModal;
