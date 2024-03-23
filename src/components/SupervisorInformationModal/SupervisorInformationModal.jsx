import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
} from "react-native";
import Typography from "../Typography/Typography";
import CloseIcon from "../../SVG/CloseIcon";
import DueInIcon from "../../SVG/DueInIcon";
import DueOutIcon from "../../SVG/DueOutIcon";
import CheckedOutIcon from "../../SVG/CheckedOutIcon";
import CheckIcon from "../../SVG/CheckIcon";
import TierSilverIcon from "../../SVG/TierSilverIcon";
import TierGoldIcon from "../../SVG/TierGoldIcon";
import TierDiamondIcon from "../../SVG/TierDiamondIcon";
import { colors } from "../../../themes/themes";

const SupervisorInformationModal = ({
    isInformationModalOpen,
    toggleInformationModal,
}) => {
  return (
    <Modal
          visible={isInformationModalOpen}
          onRequestClose={toggleInformationModal}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.itemDetailModal}>
              <View>
                <CloseIcon onPress={toggleInformationModal} />
                <View style={{ gap: 8}}>
                  <Typography variant="body-black" style={{ paddingBottom: 8}}>Room Status</Typography>
                  <View style={{ flexDirection: "row", gap:6}}>
                    <DueOutIcon/>
                    <Typography variant="xs-regular">Due Out</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap:6}}>
                    <DueInIcon/>
                    <Typography variant="xs-regular">Due In</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap:6}}>
                    <DueOutIcon/>
                    <DueInIcon/>
                    <Typography variant="xs-regular">Due Out - Due In</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap:6}}>
                    <CheckedOutIcon/>
                    <Typography variant="xs-regular">Checked Out</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap:6}}>
                  <CheckedOutIcon/>
                  <DueInIcon/>
                    <Typography variant="xs-regular">Checked Out - Due In</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap:6}}>
                    <CheckIcon stroke={colors.teal} />
                    <Typography variant="xs-regular">Checked In</Typography>
                  </View>
                </View>
                <View style={{ gap: 8, marginTop: 16 }}>
                  <Typography variant="body-black" style={{ paddingVertical: 8}}>Room Tier</Typography>
                  <View style={{ flexDirection: "row", gap:6}}>
                    <TierSilverIcon />
                    <Typography variant="xs-regular">Silver</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap:6}}>
                    <TierGoldIcon />
                    <Typography variant="xs-regular">Gold</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap:6}}>
                    <TierDiamondIcon />
                    <Typography variant="xs-regular">Platinum</Typography>
                  </View>
                </View>
                <View style={{ gap: 8, marginTop: 16 }}>
                  <Typography variant="body-black" style={{ paddingVertical: 8}}>Colour Code</Typography>
                  <View style={{ flexDirection: "row", gap:6}}>
                    <View style={[styles.colorButton, {backgroundColor: colors.pink_yellow}]}></View>
                    <Typography variant="xs-regular">Suite</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap:6}}>
                    <View style={[styles.colorButton, {backgroundColor: colors.yellow1}]}></View>
                    <Typography variant="xs-regular">King</Typography>
                  </View><View style={{ flexDirection: "row", gap:6}}>
                    <View style={[styles.colorButton, {backgroundColor: colors.yellow2}]}></View>
                    <Typography variant="xs-regular">Queen</Typography>
                  </View><View style={{ flexDirection: "row", gap:6}}>
                    <View style={[styles.colorButton, {backgroundColor: colors.n0, borderWidth: 1, borderColor: colors.main}]}></View>
                    <Typography variant="xs-regular">Regular</Typography>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
  );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      itemDetailModal: {
        backgroundColor: "white",
        paddingHorizontal: 33,
        paddingVertical: 26,
        borderRadius: 8,
        width: "70%",
        paddingBottom: 45,
      },
      colorButton: {
        width: 21,
        height: 21,
        borderRadius: 21
      }
    });

export default SupervisorInformationModal;
