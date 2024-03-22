import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import ClockShiftIcon from "../../SVG/ClockShiftIcon";
import { ProgressBar, MD3Colors } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "../Typography/Typography";
import InformationIcon from "../../SVG/InformationIcon";
import CloseIcon from "../../SVG/CloseIcon";
import DueInIcon from "../../SVG/DueInIcon";
import DueOutIcon from "../../SVG/DueOutIcon";
import CheckedOutIcon from "../../SVG/CheckedOutIcon";
import CheckIcon from "../../SVG/CheckIcon";
import TierSilverIcon from "../../SVG/TierSilverIcon";
import TierGoldIcon from "../../SVG/TierGoldIcon";
import TierDiamondIcon from "../../SVG/TierDiamondIcon";
import { colors } from "../../../themes/themes";

const HousekeeperHomeHeader = ({
  name,
  message,
  taskProgress,
  scheduleTime,
}) => {
  const [isInformationModalOpen, setInformationModalOpen] = useState(false);

  const displayInformation = () => {
    setInformationModalOpen(true);
  };

  const toggleInformationModal = () => {
    setInformationModalOpen(!isInformationModalOpen);
  };
  return (
    <View>
      <LinearGradient
        colors={["#F89C7B", "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
        start={{ x: 0.0, y: 0.0 }} // Start at the top-left corner
        end={{ x: 1.0, y: 1.0 }} // End at the bottom-right corner
        locations={[0.0812, 0.7935, 0.8469, 1.1039]} // Approximated locations based on your percentages
        style={styles.container}
      >
        <View style={styles.leftProfileContainer}>
          <Image
            //source={require("./path-to-your-image.jpg")} // Replace with the path to your image
            source={{
              uri: "https://picsum.photos/2000/600?random=11",
            }}
            style={styles.profilePic}
          />
        </View>
        <View style={styles.middleContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Typography variant="title-black">Hi {name}</Typography>
            <TouchableOpacity onPress={displayInformation}>
              <InformationIcon />
            </TouchableOpacity>
          </View>
          <Typography variant="small-regular">{message}</Typography>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.progressContainer}>
              <Typography variant="xs-regular">Task Progress</Typography>
              <ProgressBar progress={0.5} color={colors.teal} />
            </View>
            <View style={styles.rightInnerContainer}>
              <ClockShiftIcon />
              <Typography variant="xs-regular">{scheduleTime}</Typography>
            </View>
          </View>
        </View>
      </LinearGradient>
      {isInformationModalOpen && (
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
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 60,
    backgroundColor: "#F89C7B",
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 10,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  leftProfileContainer: {},
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  middleContainer: {
    rowGap: 6,
    flexGrow: 1,
  },
  rightContainer: {
    paddingTop: 72,
    justifyContent: "flex-end",
  },
  rightInnerContainer: {
    flexDirection: "row",
  },
  progressContainer: {
    flexDirection: "column",
    rowGap: 6,
  },
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
});

export default HousekeeperHomeHeader;
