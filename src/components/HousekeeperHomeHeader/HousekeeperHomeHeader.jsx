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
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";

const HousekeeperHomeHeader = ({ name, taskProgress, scheduleTime }) => {
  const [isInformationModalOpen, setInformationModalOpen] = useState(false);
  const accessTokenStore = useAccessTokenStore(
    (state) => state.accessTokenStore,
  );
  const updateAccessTokenStore = useAccessTokenStore(
    (state) => state.updateAccessTokenStore,
  );

  const employeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.employeeDetailsStore,
  );
  const updateEmployeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.updateEmployeeDetailsStore,
  );

  const displayInformation = () => {
    setInformationModalOpen(true);
  };

  const toggleInformationModal = () => {
    setInformationModalOpen(!isInformationModalOpen);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={styles.leftProfileContainer}>
        <Image
          source={{
            uri: `${employeeDetailsStore.imageURL}`,
          }}
          style={styles.profilePic}
        />
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.progressContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4-medium">
              Hi {employeeDetailsStore.firstName}
            </Typography>
            <TouchableOpacity onPress={displayInformation}>
              <InformationIcon w="30" h="30" />
            </TouchableOpacity>
          </View>
          <Typography variant="body-regular">Time to shine at work!</Typography>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                paddingTop: 8,
              }}
            >
              <View style={styles.progressContainer}>
                <Typography variant="small-regular">Task Progress</Typography>
                <ProgressBar
                  progress={Number(taskProgress)}
                  color={colors.teal}
                  style={{
                    height: 12,
                    width: 180,
                    borderRadius: 20,
                    backgroundColor: colors.n1,
                  }}
                />
                {/* <Text>{taskProgress}</Text> */}
              </View>
            </View>
            <View style={{ gap: 6 }}>
              <View style={{ flexDirection: "row", gap: 6 }}>
                <ClockShiftIcon />
                <Typography variant="small-regular">Shift</Typography>
              </View>
              <Typography variant="xs-regular">{scheduleTime}</Typography>
            </View>
          </View>
        </View>
      </View>
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
                <View style={{ gap: 8 }}>
                  <Typography variant="body-black" style={{ paddingBottom: 8 }}>
                    Room Status
                  </Typography>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <DueOutIcon />
                    <Typography variant="xs-regular">Due Out</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <DueInIcon />
                    <Typography variant="xs-regular">Due In</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <DueOutIcon />
                    <DueInIcon />
                    <Typography variant="xs-regular">
                      Due Out - Due In
                    </Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <CheckedOutIcon />
                    <Typography variant="xs-regular">Checked Out</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <CheckedOutIcon />
                    <DueInIcon />
                    <Typography variant="xs-regular">
                      Checked Out - Due In
                    </Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <CheckIcon stroke={colors.teal} />
                    <Typography variant="xs-regular">Checked In</Typography>
                  </View>
                </View>
                <View style={{ gap: 8, marginTop: 16 }}>
                  <Typography
                    variant="body-black"
                    style={{ paddingVertical: 8 }}
                  >
                    Room Tier
                  </Typography>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <TierSilverIcon />
                    <Typography variant="xs-regular">Silver</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <TierGoldIcon />
                    <Typography variant="xs-regular">Gold</Typography>
                  </View>
                  <View style={{ flexDirection: "row", gap: 6 }}>
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
  leftProfileContainer: {},
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
