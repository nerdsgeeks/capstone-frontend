import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
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
import PlusIcon from "../../SVG/PlusIcon";
import { useRequestCartStore, useRequestStore } from "../../store/requestStore";
import useBaseUrl from "../../hooks/useBaseUrl";
import axios from "axios";
import { useBaseScreenStore } from "../../store/screensStore";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRoomDetailsStore, useRoomsStore } from "../../store/roomStore";
import Button from "../../components/Button/Button";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../../../themes/themes";
import TextChip from "../../components/TextChip/TextChip";
import { Checkbox } from "expo-checkbox";
import StopIcon from "../../SVG/StopIcon";
import NewCartIcon from "../../SVG/NewCartIcon";
import NewCartIconOutline from "../../SVG/NewCartIconOutline";

const RoomDetail = ({ route, navigation }) => {
  // const { roomDetails } = route.params;
  const roomDetailsStore = useRoomDetailsStore(
    (state) => state.roomDetailsStore,
  );
  const updateRoomDetailsStore = useRoomDetailsStore(
    (state) => state.updateRoomDetailsStore,
  );
  const { items } = route.params;
  // const { navigation } = route.params;
  const baseUrl = useBaseUrl();
  console.log("roomDetailsStore");
  console.log(roomDetailsStore);

  const [showStart, setShowStart] = useState(true);
  const [showPause, setShowPause] = useState(false);
  const [isStarted, setIsStarted] = useState(
    roomDetailsStore.cleaningStatus.toUpperCase() === "Cleaned".toUpperCase() ||
      roomDetailsStore.cleaningStatus.toUpperCase() === "Approved".toUpperCase()
      ? true
      : false,
  );
  const [firstTimeStart, setFirstTimeStart] = useState(true);
  const [doneDisabled, setDoneDisabled] = useState(
    roomDetailsStore.cleaningStatus.toUpperCase() === "Cleaned".toUpperCase() ||
      roomDetailsStore.cleaningStatus.toUpperCase() === "Approved".toUpperCase()
      ? true
      : true,
  );
  const [startDisabled, setStartDisabled] = useState(
    roomDetailsStore.cleaningStatus.toUpperCase() === "Cleaned".toUpperCase() ||
      roomDetailsStore.cleaningStatus.toUpperCase() === "Approved".toUpperCase()
      ? true
      : false,
  );
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isHelperRequested, setIsHelperRequested] = useState(
    roomDetailsStore.isHelperRequested,
  );
  const [isHelpButtonDisabled, setIsHelpButtonDisabled] = useState(
    roomDetailsStore.isHelperRequested,
  );
  const [isRequestButtonDisabled, setIsRequestButtonDisabled] = useState(
    roomDetailsStore.cleaningStatus.toUpperCase() === "Cleaned".toUpperCase() ||
      roomDetailsStore.cleaningStatus.toUpperCase() === "Approved".toUpperCase()
      ? true
      : false,
  );
  const [isRequestHelpModalTextFocused, setIsRequestHelpModalTextFocused] =
    useState(false);

  const [isBottomTextContainerEnabled, setIsBottomTextContainerEnabled] =
    useState(false);
  const [hasRequestedItems, setHasRequestedItems] = useState(true);

  const [isRequestHelpModalOpen, setRequestHelpModalState] = useState(false);
  const [requestedItems, setrequestedItems] = useState([]);
  const [helperNotes, setHelperNotes] = useState("");

  const handleHelpTypeCheckboxChange = (key) => {
    setHelperNotes((prevSelectedHelpTypes) => {
      if (prevSelectedHelpTypes.includes(key)) {
        // If key is already selected, remove it
        return prevSelectedHelpTypes
          .split(", ")
          .filter((item) => item !== key)
          .join(", ");
      } else {
        // Otherwise, add it
        return prevSelectedHelpTypes ? `${prevSelectedHelpTypes}, ${key}` : key;
      }
    });
  };

  const HelpTypes = [
    { key: "Manager", value: "Manager" },
    { key: "Electric", value: "Electric" },
    { key: "Plumber", value: "Plumber" },
    { key: "Housekeeper", value: "Housekeeper" },
    { key: "Bell Hop", value: "Bell Hop" },
    { key: "Guest Assistant", value: "Guest Assistant" },
  ];

  const requestedItemsCartStore = useRequestCartStore(
    (state) => state.requestedItemsCartStore,
  );
  const updateRequestedItemsCartStore = useRequestCartStore(
    (state) => state.updateRequestedItemsCartStore,
  );

  const baseScreenStore = useBaseScreenStore((state) => state.baseScreenStore);
  const updateBaseScreenStore = useBaseScreenStore(
    (state) => state.updateBaseScreenStore,
  );

  const roomsStore = useRoomsStore((state) => state.roomsStore);
  const updateRoomsStore = useRoomsStore((state) => state.updateRoomsStore);

  // const [modalNoteText, setModalNoteText] = useState("");

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

  // const handlemodalNoteTextChange = (text) => {
  //   setModalNoteText(text);
  // };

  // const updateSelectedItemWithNote = () => {
  //   const updatedRoomDetails = {
  //     ...roomDetailsStore,
  //     helperRequestedAdditionalNotes: modalNoteText,
  //   };
  //   updateRoomDetailsStore(updatedRoomDetails);
  // };

  const toggleRequestHelpModal = () => {
    console.log(isRequestHelpModalOpen);
    setRequestHelpModalState(!isRequestHelpModalOpen);
  };

  const roomGoldCheckedOutcheckedIn = {
    tier: roomDetailsStore.RoomTier,
    type: roomDetailsStore.roomTypeName,
    status: roomDetailsStore.Rooms_RoomStatus,
    roomNumber: roomDetailsStore.RoomName,
    date: roomDetailsStore.CheckinDate,
  };

  const reservation = {
    roomId: roomDetailsStore.RoomName,
    CheckinDate: roomDetailsStore.CheckinDate,
    CheckoutDate: roomDetailsStore.CheckinDate,
    guestName: roomDetailsStore.guestName,
    noOfGuest: roomDetailsStore.noOfGuest,
    additionalNotes: roomDetailsStore.AdditionalNotes,
    isCompleted: roomDetailsStore.isCompleted,
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
    console.log(roomDetailsStore);

    if (firstTimeStart) {
      roomDetailsStore.startTime = new Date().toISOString();
      updateRoomDetailsStore(roomDetailsStore);
      console.log("firstTimeStart");
      console.log(roomDetailsStore);
    }

    setShowStart(false);
    setShowPause(true);
    setIsStarted(true);
    setIsBottomTextContainerEnabled(true);
    setIsTimerRunning(true);
    setDoneDisabled(true);
    setFirstTimeStart(false);
  };

  const onPausePressed = () => {
    console.log("Pause pressed");
    setShowStart(true);
    setShowPause(false);
    setIsTimerRunning(false);
    setDoneDisabled(false);
    console.log("onPausePressed");
    console.log(roomDetailsStore);
    roomDetailsStore.endTime = new Date().toISOString();
    updateRoomDetailsStore(roomDetailsStore);
    console.log("endTime");
    console.log(roomDetailsStore);
  };

  const onDonePressed = () => {
    console.log("Done pressed");
  };

  const onRequestHelpModalSubmitPressed = () => {
    console.log("RequestHelpModalSubmitPressed");

    const tempAssignedRoomObject = {
      ID: roomDetailsStore.ID,
      roomID: roomDetailsStore.roomID,
      assignedDateTime: roomDetailsStore.assignedDateTime,
      assignedEmployeeID: roomDetailsStore.assignedEmployeeID,
      cleaningStatus: roomDetailsStore.cleaningStatus,
      isCompleted: roomDetailsStore.isCompleted,
      verifiedPhotoUrl: roomDetailsStore.verifiedPhotoUrl,
      startTime: roomDetailsStore.startTime,
      endTime: roomDetailsStore.endTime,
      cleaningDuration: roomDetailsStore.cleaningDuration,
      isHelperRequested: true,
      reguestedHelperID: roomDetailsStore.reguestedHelperID,
      AdditionalNotes: roomDetailsStore.AdditionalNotes,
      inspectionFeedback: roomDetailsStore.inspectionFeedback,
      rating: roomDetailsStore.rating,
      inspectionPhotos: roomDetailsStore.inspectionPhotos,
      inspectionNotes: roomDetailsStore.inspectionNotes,
      isHelperRequestedApproved: roomDetailsStore.isHelperRequestedApproved,
      helperRequestedAdditionalNotes: helperNotes,
    };

    onUpdateAssignedRoom(tempAssignedRoomObject);
    toggleRequestHelpModal();
  };

  const onUpdateAssignedRoom = (tempAssignedRoom) => {
    const apiUrl = baseUrl + "/api/assignedrooms/updateAssignedRoom";
    console.log(apiUrl);
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    axios
      .put(apiUrl, tempAssignedRoom, config)
      .then((response) => {
        const data = response.data;
        // console.log("onUpdateAssignedRoom");
        // console.log(roomDetailsStore);

        const updatedRoomDetails = {
          ...roomDetailsStore,
          helperRequestedAdditionalNotes: helperNotes,
          isHelperRequested: true,
        };

        // console.log("updatedRoomDetails");
        // console.log(updatedRoomDetails);
        let tempRoomStore = roomsStore;
        // Find the index of the room in the array
        const index = tempRoomStore.findIndex(
          (room) => room.ID === tempAssignedRoom.ID,
        );

        // Check if the room was found
        if (index !== -1) {
          // Update the room details in the array
          tempRoomStore[index] = {
            ...tempRoomStore[index],
            ...tempAssignedRoom,
          };
        } else {
          console.log("Room not found");
        }

        updateRoomsStore(tempRoomStore);
        // console.log("roomsStore");
        // console.log(roomsStore);

        updateRoomDetailsStore(updatedRoomDetails);
        setIsHelperRequested(true);
        setIsHelpButtonDisabled(true);
        setIsBottomTextContainerEnabled(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // console.log(baseUrl);
    // console.log("roomDetailsStore");
    // console.log(roomDetailsStore);
    console.log("useEffect");
    const apiUrl =
      baseUrl + `/api/requestItems/getRequestItemView/${roomDetailsStore.ID}`;

    console.log(apiUrl);
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    const onFetchRequestItemsByAssignedRoomId = () =>
      axios
        .get(apiUrl, config)
        .then((response) => {
          let data = response.data;

          let dataWithCount = [];
          if (data.length > 0) {
            dataWithCount = data.map((item) => {
              const { Quantity, ...rest } = item;
              return { ...rest, count: Quantity };
            });
            data = dataWithCount;
          }
          setrequestedItems(data);
          console.log("setrequestedItems");
          console.log(dataWithCount);
        })
        .catch((error) => {
          console.log(error);
        });

    onFetchRequestItemsByAssignedRoomId();
    updateBaseScreenStore("RoomDetail");
  }, [requestedItemsCartStore, roomDetailsStore]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("useFocusEffect");
      // setDoneDisabled(
      //   roomDetailsStore.cleaningStatus.toUpperCase() ===
      //     "Cleaned".toUpperCase() ||
      //     roomDetailsStore.cleaningStatus.toUpperCase() ===
      //       "Approved".toUpperCase()
      //     ? true
      //     : true,
      // );

      if (
        roomDetailsStore.cleaningStatus.toUpperCase() ===
          "Cleaned".toUpperCase() ||
        roomDetailsStore.cleaningStatus.toUpperCase() ===
          "Approved".toUpperCase()
      ) {
        setDoneDisabled(true);
        setIsHelpButtonDisabled(true);
        setIsRequestButtonDisabled(true);
      }
      // Return a no-op function if no clean-up is needed
      return () => {};
    }, [baseUrl, roomDetailsStore]),
  );

  return (
    <SafeAreaProvider style={{ gap: 16, backgroundColor: colors.n0 }}>
      <RoomDetailHeader
        room={roomDetailsStore}
        taskStatus={roomDetailsStore.cleaningStatus}
        navigation={navigation}
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
          <Text>{doneDisabled}</Text>
          {requestedItems.length > 0 && (
            <RequestedItemsList
              items={requestedItems}
              disabled={true}
            ></RequestedItemsList>
          )}
        </ScrollView>

        <Modal
          visible={isRequestHelpModalOpen}
          onRequestClose={toggleRequestHelpModal}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={{ flexDirection: "row", marginHorizontal: 26 }}>
              <View style={styles.modalView}>
                <CloseIcon onPress={toggleRequestHelpModal} />
                <View style={styles.requestHelpModalContainer}>
                  <Typography variant="h5-black">Need extra hands?</Typography>
                  <Typography variant="title-medium">
                    Room: {roomDetailsStore.RoomName}
                  </Typography>
                  <View style={{ gap: 30 }}>
                    <Image
                      source={require("./../../../assets/illustrations/Ask-for-Help.png")}
                      style={styles.requestHelpModalImage}
                    />
                    <View style={styles.requestHelpModalNoteSection}>
                      <Typography variant="body-medium">
                        Select type of help:{" "}
                      </Typography>
                      {HelpTypes.map((helpType) => (
                        <View
                          key={helpType.key}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Checkbox
                            value={helperNotes.includes(helpType.key)}
                            onValueChange={() =>
                              handleHelpTypeCheckboxChange(helpType.key)
                            }
                            color={helperNotes ? colors.teal : undefined}
                          />
                          <Typography variant="small-regular">
                            {helpType.value}
                          </Typography>
                        </View>
                      ))}
                      {/* <View>
                        {!isRequestHelpModalTextFocused && (
                          <View style={{ position: "absolute", top: 15, left: 10 }}>
                            <PlusIcon />
                          </View>
                        )}
                        <TextInput
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
                          onBlur={() => {
                            setIsRequestHelpModalTextFocused(false);
                            updateSelectedItemWithNote();
                          }}
                          onChangeText={handlemodalNoteTextChange} // Update state on text change
                          value={modalNoteText}
                        />
                      </View> */}
                    </View>
                    <Button
                      type="primary"
                      onPress={onRequestHelpModalSubmitPressed}
                      name="Request Help"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <View style={[styles.bottomContainer]}>
          <View style={styles.bottomTextContainer}>
            {isStarted && <Stopwatch isRunning={isTimerRunning} />}
            {isHelpButtonDisabled && isHelperRequested && (
              <TextChip
                text="Help Requested"
                backgroundColor={colors.pale_teal1}
                paddingVertical={12.5}
                paddingHorizontal={16}
              />
            )}
          </View>
          <View style={[styles.bottomButtonsContainer]}>
            <TouchableOpacity
              disabled={isHelpButtonDisabled}
              onPress={onHelpPressed}
              style={[
                styles.commonButton,
                isHelpButtonDisabled && styles.disabledButton,
              ]}
            >
              <HelpIcon
                w="26"
                h="19.68"
                fill={isHelpButtonDisabled ? colors.n30 : "#1E1E1E"}
                stroke={isHelpButtonDisabled ? colors.n30 : "#1E1E1E"}
              ></HelpIcon>
              <Typography
                variant="small-regular"
                style={[isHelpButtonDisabled && { color: colors.n30 }]}
              >
                Help
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={isRequestButtonDisabled}
              onPress={() =>
                navigation.navigate("RequestItemSupplies", {
                  roomDetails: roomDetailsStore,
                  items: items,
                  screenTitle: "Room Supplies",
                })
              }
              style={[
                styles.commonButton,
                isRequestButtonDisabled && styles.disabledButton,
              ]}
            >
              <RequestIcon
                w="26"
                h="21.27"
                stroke={isRequestButtonDisabled ? colors.n30 : "black"}
              ></RequestIcon>
              <Typography
                variant="small-regular"
                style={[isRequestButtonDisabled && { color: colors.n30 }]}
              >
                Request
              </Typography>
            </TouchableOpacity>

            {showStart && (
              <TouchableOpacity
                disabled={
                  roomDetailsStore.cleaningStatus.toUpperCase() ===
                    "Cleaned".toUpperCase() ||
                  roomDetailsStore.cleaningStatus.toUpperCase() ===
                    "Approved".toUpperCase()
                    ? true
                    : false
                }
                onPress={onStartPressed}
                style={[
                  styles.startButton,
                  startDisabled && styles.disabledButton,
                ]}
              >
                <PlayIcon
                  w="17"
                  h="17"
                  fill={startDisabled ? colors.n30 : "#1E1E1E"}
                ></PlayIcon>
                <Typography
                  variant="small-regular"
                  style={[startDisabled && { color: colors.n30 }]}
                >
                  Start
                </Typography>
              </TouchableOpacity>
            )}

            {showPause && (
              <TouchableOpacity
                onPress={onPausePressed}
                style={styles.commonButton}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <PauseIcon />
                  <StopIcon w="14" h="14" />
                </View>
                <Typography variant="small-regular" style={{ marginTop: 4 }}>
                  Stop
                </Typography>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              disabled={doneDisabled}
              onPress={() => {
                setStartDisabled(true);
                setIsStarted(true);
                navigation.navigate("Camera", {
                  roomDetails: roomDetailsStore,
                });
              }}
              style={[
                styles.commonButton,
                doneDisabled && styles.disabledButton,
              ]}
            >
              <CheckIcon
                w="26"
                h="26"
                // fill={doneDisabled ? colors.n20 : "none"}
                stroke={doneDisabled ? colors.n30 : "black"}
              ></CheckIcon>
              <Typography
                variant="small-regular"
                style={[doneDisabled && { color: colors.n30 }]}
              >
                Done
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default RoomDetail;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   flexDirection: "column",

  // },
  mainAndButtonContainer: {
    flex: 1,
    flexDirection: "column",
  },
  bottomContainer: {
    gap: 25,
    paddingVertical: 10,
    marginHorizontal: 26,
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
    width: 80,
    height: 80,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: colors.n20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    gap: 6,
  },
  startButton: {
    width: 80,
    height: 80,
    borderWidth: 1,
    backgroundColor: colors.yellow1,
    borderColor: colors.n20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,

    gap: 6,
  },
  disabledButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 3,
    backgroundColor: colors.n1,
  },
  buttonTextStyle: {
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flexGrow: 1,
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    gap: 16,
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
    width: 169.31,
    height: 140,
  },
  requestHelpModalNoteSection: {
    alignSelf: "flex-start",
    width: "100%",
    gap: 12,
  },
  // requestHelpModalNoteLabel: {
  //   fontSize: 14,
  // },
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
