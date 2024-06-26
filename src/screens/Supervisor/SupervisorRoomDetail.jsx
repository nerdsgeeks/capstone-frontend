import React, { useState } from "react";
import { Modal, StyleSheet, Image, View } from "react-native";
import RoomDetailHeader from "../../components/RoomDetailHeader/RoomDetailHeader";
import RoomDetailInfo from "../../components/RoomDetailInfo/RoomDetailInfo";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import { colors } from "../../../themes/themes";
import TextChip from "../../components/TextChip/TextChip";
import BigButton from "../../components/BigButton/BigButton";
import BedIcon from "../../SVG/BedIcon";
import CheckIcon from "../../SVG/CheckIcon";
import CloseIcon from "../../SVG/CloseIcon";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import useBaseUrl from "../../hooks/useBaseUrl";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";
import NewCartIcon from "../../SVG/NewCartIcon";

const SupervisorRoomDetail = ({ staff, onPress, route, navigation }) => {
  const [isModalOpen, setModalState] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const toggleModal = () => setModalState(!isModalOpen);
  const room = route.params.room;
  const baseUrl = useBaseUrl();
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

  const updateRoomStatus = () => {
    const updateRoomItem = {
      ID: room.roomID,
      RoomName: room.RoomName,
      RoomTypeID: room.RoomTypeID,
      Floor: room.Floor,
      RoomStatus: selectedStatus,
      RoomImageUrl: room.RoomImageUrl,
      RoomTier: room.RoomTier,
    };

    const apiUrl = baseUrl + "/api/rooms/updateroom";
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    axios
      .put(apiUrl, updateRoomItem, config)
      .then((response) => {
        console.log("Room updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating updating room:", error);
      });

    toggleModal();
  };

  const onPressInspection = () => {
    // Assuming you want to pass some data to the InspectionReview screen
    navigation.navigate("InspectionReview", { room: room });
  };

  const roomStatus = [
    { key: "DueOut", value: "Due Out" },
    { key: "DueIn", value: "Due In" },
    { key: "DueOut-DueIn", value: "Due Out - Due In" },
    { key: "CheckedOut", value: "Checked Out" },
    { key: "CheckedOut-CheckedIn", value: "Checked Out - Checked In" },
    { key: "CheckIn", value: "Checked In" },
  ];

  const image = employeeDetailsStore.imageURL;
  const employeeName = `${employeeDetailsStore.firstName} ${employeeDetailsStore.lastName}`;

  return (
    <SafeAreaProvider>
      <View style={{ gap: 24, flex: 1 }}>
        <RoomDetailHeader
          room={room}
          taskStatus="pending"
          navigation={navigation}
        />

        <RoomDetailInfo reservation={room} room={room} />
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
              alignItems: "center",
              marginHorizontal: 26,
              gap: 6,
            }}
          >
            {room.employeeImageURL && (
              <Image
                style={{ borderRadius: 40, width: 50, height: 50 }}
                source={{
                  uri: room.employeeImageURL,
                }}
              />
            )}

            <View>
              {room.firstName && (
                <Typography variant="body-regular">
                  {room.firstName} {room.lastName}
                </Typography>
              )}
            </View>
          </View>
          {room.isHelperRequested && (
            <View style={{ marginHorizontal: 26 }}>
              <TextChip
                text="Help Requested"
                backgroundColor={colors.pale_teal1}
                paddingVertical={12.5}
                paddingHorizontal={16}
                // style={{ marginHorizontal: 25 }}
              />
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            flexGrow: 1,
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginHorizontal: 26,
          }}
        >
          <BigButton
            name="Update Rooms"
            icon={<BedIcon w="40" h="28" fill={colors.main} />}
            onPress={toggleModal}
          />
          <BigButton
            name="Inspect"
            disabled={room.cleaningStatus === "Cleaned" ? false : true}
            icon={
              room.cleaningStatus === "Cleaned" ? (
                <CheckIcon w="30" h="30" stroke={colors.orange} />
              ) : (
                <CheckIcon w="30" h="30" stroke={colors.n30} />
              )
            }
            onPress={onPressInspection}
          />
          <Modal
            visible={isModalOpen}
            onRequestClose={toggleModal}
            animationType="fade"
            transparent={true}
          >
            <View style={styles.overlay}>
              <View style={styles.modalView}>
                <CloseIcon onPress={toggleModal} />
                <Typography variant="h5-black">Update Room Status</Typography>
                <Typography variant="title-regular">
                  Room {room.RoomName}
                </Typography>
                <View style={{ marginTop: 45, gap: 16 }}>
                  <View style={{ gap: 6 }}>
                    <Typography variant="xs-medium">Room Status</Typography>
                    <SelectList
                      setSelected={(val) => setSelectedStatus(val)}
                      data={roomStatus}
                      save="value"
                    />
                  </View>

                  <Button
                    name="Assign"
                    type="primary"
                    onPress={updateRoomStatus}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8FCBBC",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: "70%",
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
export default SupervisorRoomDetail;
