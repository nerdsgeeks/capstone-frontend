import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  TextInput,
} from "react-native";
import Typography from "../../components/Typography/Typography";
import RoomDetailInfo from "../../components/RoomDetailInfo/RoomDetailInfo";
import RoomDetailHeader from "../../components/RoomDetailHeader/RoomDetailHeader";
import HelpIcon from "../../SVG/HelpIcon";
import RequestIcon from "../../SVG/RequestIcon";
import PlayIcon from "../../SVG/PlayIcon";
import PauseIcon from "../../SVG/PauseIcon";
import CheckIcon from "../../SVG/CheckIcon";
import Stopwatch from "../../components/Stopwatch/Stopwatch";
import RequestedItemsList from "../../components/RequestedItemsList/RequestedItemsList";
import CloseIcon from "../../SVG/CloseIcon";
import AddNote from "../../components/AddNote/AddNote";
import PlusIcon from "../../SVG/PlusIcon";
import { useRequestStore } from "../../store/requestStore";

const RoomDetail = ({ route, navigation }) => {
  const { roomDetails } = route.params;
  const [showStart, setShowStart] = useState(true);
  const [showPause, setShowPause] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isHelperRequested, setIsHelperRequested] = useState(false);
  const [isHelpButtonDisabled, setIsHelpButtonDisabled] = useState(false);
  const [isRequestHelpModalTextFocused, setIsRequestHelpModalTextFocused] =
    useState(false);

  const [isBottomTextContainerEnabled, setIsBottomTextContainerEnabled] =
    useState(false);
  const [hasRequestedItems, setHasRequestedItems] = useState(true);

  const [isRequestHelpModalOpen, setRequestHelpModalState] = useState(false);
  const requestedItems = useRequestStore((state) => state.requestedItems);

  const toggleRequestHelpModal = () => {
    console.log(isRequestHelpModalOpen);
    setRequestHelpModalState(!isRequestHelpModalOpen);
  };

  const roomGoldCheckedOutcheckedIn = {
    tier: roomDetails.tier,
    type: roomDetails.type,
    status: roomDetails.status,
    roomNumber: roomDetails.roomNumber,
    date: roomDetails.date,
  };

  const reservation = {
    id: 12345,
    roomId: roomDetails.roomNumber,
    checkIn: "2024-03-10",
    checkOut: "2024-03-15",
    guestName: roomDetails.guestName,
    noOfGuest: 2,
    additionalNotes: "Prefer a room with a view if available.",
    isCompleted: roomDetails.isCompleted,
  };

  const onHelpPressed = () => {
    console.log("Helped pressed");
    toggleRequestHelpModal();
  };

  const onRequestPressed = () => {
    console.log("Request pressed");
  };

  const onStartPressed = () => {
    console.log("Start pressed");
    setShowStart(false);
    setShowPause(true);
    setIsStarted(true);
    setIsBottomTextContainerEnabled(true);
    setIsTimerRunning(true);
  };

  const onPausePressed = () => {
    console.log("Pause pressed");
    setShowStart(true);
    setShowPause(false);
    setIsTimerRunning(false);
  };

  const onDonePressed = () => {
    console.log("Done pressed");
  };

  const onRequestHelpModalSubmitPressed = () => {
    console.log("RequestHelpModalSubmitPressed");
    setIsHelperRequested(true);
    setIsHelpButtonDisabled(true);
    setIsBottomTextContainerEnabled(true);
    toggleRequestHelpModal();
  };

  // Dummy data for the items
  // const requestedItems = [
  //   {
  //     id: "1",
  //     imageSrc: "https://picsum.photos/2000/600?random=11",
  //     itemName: "Item 1",
  //     count: 2,
  //   },
  //   {
  //     id: "2",
  //     imageSrc: "https://picsum.photos/2000/600?random=12",
  //     itemName: "Item 2",
  //     count: 2,
  //   },
  //   {
  //     id: "3",
  //     imageSrc: "https://picsum.photos/2000/600?random=13",
  //     itemName: "Item 3",
  //     count: 2,
  //   },
  // ];

  return (
    <View style={styles.container}>
      <RoomDetailHeader
        room={roomDetails}
        taskStatus={"Cleaning"}
      ></RoomDetailHeader>

      <View style={styles.mainAndButtonContainer}>
        <ScrollView
          style={{ flex: isBottomTextContainerEnabled ? 9.44 : 9.63 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
        >
          <RoomDetailInfo
            room={roomGoldCheckedOutcheckedIn}
            reservation={reservation}
          ></RoomDetailInfo>

          {requestedItems.length > 0 && (
            <RequestedItemsList items={requestedItems}></RequestedItemsList>
          )}
        </ScrollView>

        <Modal
          visible={isRequestHelpModalOpen}
          onRequestClose={toggleRequestHelpModal}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <CloseIcon onPress={toggleRequestHelpModal} />
              <View style={styles.requestHelpModalContainer}>
                <Typography variant="title-black">Need extra hands?</Typography>
                <Text style={styles.requestHelpModalSubHeaderText}>
                  Room: {roomDetails.roomNumber}
                </Text>
                <View style={styles.requestHelpModalImageContainer}>
                  <Image
                    source={require("./../../../assets/request-help-modal-image.png")}
                    style={styles.requestHelpModalImage}
                  />
                </View>
                <View style={styles.requestHelpModalNoteSection}>
                  <Text style={styles.requestHelpModalNoteLabel}>Add Note</Text>
                  <View>
                    {!isRequestHelpModalTextFocused && (
                      <View style={{ position: "absolute", top: 15, left: 10 }}>
                        <PlusIcon />
                      </View>
                    )}

                    <TextInput
                      multiline
                      style={[
                        styles.requestHelpModalInput,
                        {
                          padding: isRequestHelpModalTextFocused ? 2 : 10,
                          paddingLeft: isRequestHelpModalTextFocused ? 20 : 36,
                          height: isRequestHelpModalTextFocused ? 80 : 40,
                        },
                      ]}
                      placeholder="Note"
                      onFocus={() => setIsRequestHelpModalTextFocused(true)}
                      onBlur={() => setIsRequestHelpModalTextFocused(false)}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.requestHelpModalButton}
                  onPress={onRequestHelpModalSubmitPressed}
                >
                  <Text style={styles.requestHelpModalButtonText}>
                    Request Help
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View
          style={[
            styles.bottomContainer,
            { flex: isBottomTextContainerEnabled ? 0.56 : 0.37 },
          ]}
        >
          <View style={styles.bottomTextContainer}>
            {isHelpButtonDisabled && isHelperRequested && (
              <View
                style={{
                  backgroundColor: "#8FDEDE",
                  height: 30,
                  borderRadius: 8,
                  padding: 4,
                }}
              >
                <Typography variant="small-medium">Requested Helper</Typography>
              </View>
            )}
            {isStarted && <Stopwatch isRunning={isTimerRunning} />}
          </View>
          <View style={[styles.bottomButtonsContainer]}>
            <TouchableOpacity
              disabled={isHelpButtonDisabled}
              onPress={onHelpPressed}
              style={[
                styles.commonButton,
                isHelpButtonDisabled && { backgroundColor: "#F2F2F2" },
              ]}
            >
              <HelpIcon
                fill={isHelpButtonDisabled ? "#9F9F9F" : "#1E1E1E"}
                stroke={isHelpButtonDisabled ? "#9F9F9F" : "#1E1E1E"}
              ></HelpIcon>
              <Typography
                variant="xs-regular"
                style={[
                  styles.buttonTextStyle,
                  isHelpButtonDisabled && { color: "#9F9F9F" },
                ]}
              >
                Help
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RoomDetailRequestItem", {
                  roomDetails: roomDetails,
                })
              }
              style={styles.commonButton}
            >
              <RequestIcon></RequestIcon>
              <Typography variant="xs-regular" style={{}}>
                Request
              </Typography>
            </TouchableOpacity>

            {showStart && (
              <TouchableOpacity
                onPress={onStartPressed}
                style={styles.startButton}
              >
                <PlayIcon></PlayIcon>
                <Typography variant="xs-regular" style={{ marginTop: 4 }}>
                  Start
                </Typography>
              </TouchableOpacity>
            )}

            {showPause && (
              <TouchableOpacity
                onPress={onPausePressed}
                style={styles.commonButton}
              >
                <PauseIcon></PauseIcon>
                <Typography variant="xs-regular" style={{ marginTop: 4 }}>
                  Pause
                </Typography>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={onDonePressed}
              style={styles.commonButton}
            >
              <CheckIcon></CheckIcon>
              <Typography variant="xs-regular" style={{}}>
                Done
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RoomDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  mainAndButtonContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  mainContainer: {
    height: 200,
  },
  bottomContainer: {
    rowGap: 4,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#D9D9D9",
    marginHorizontal: 20,
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 20,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  commonButton: {
    width: 54,
    height: 54,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    rowGap: 2,
  },
  startButton: {
    width: 54,
    height: 54,
    borderWidth: 1,
    backgroundColor: "#F89C7B",
    borderColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    rowGap: 2,
  },
  buttonTextStyle: {
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
    height: 600,
  },
  modalView: {
    height: 500,
    width: 290,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 30,
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
  requestHelpModalContainer: {
    width: 240,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    rowGap: 10,
    // borderWidth: 1,
  },
  requestHelpModalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  requestHelpModalSubHeaderText: {
    fontSize: 16,
    color: "grey",
  },
  requestHelpModalImageContainer: {},
  requestHelpModalImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  requestHelpModalNoteSection: {
    width: "100%",
  },
  requestHelpModalNoteLabel: {
    fontSize: 14,
  },
  requestHelpModalInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginTop: 5,
  },
  requestHelpModalButton: {
    backgroundColor: "#8FDEDE",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  requestHelpModalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
