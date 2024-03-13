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

const SupervisorRoomDetail = ({ staff, onPress, route, navigation }) => {
  const [isModalOpen, setModalState] = useState(false);
  const [selected, setSelected] = React.useState("");
  const toggleModal = () => setModalState(!isModalOpen);
  const room  = route.params.room;
  const fullName = room.FirstName + " " + room.LastName;
  const roomStatus = [
    { key: "1", value: "Dueout" },
    { key: "2", value: "DueIn" },
    { key: "3", value: "CheckedOut" },
    { key: "4", value: "CheckedIn" },
    { key: "5", value: "DueOutDueIn" },
    { key: "6", value: "CheckedOutCheckedIn" },
  ];
  
  return (
    <SafeAreaProvider>
        <RoomDetailHeader room={room} taskStatus="pending" navigation={navigation} />
        <SafeAreaView style={{ flex: 1 }}>
        <RoomDetailInfo reservation={room} room={room} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ borderRadius: 15, width: 30, height: 30 }}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <View>
            <Typography variant="xs-regular">{fullName}</Typography>
            <Typography variant="xs-regular">{room.position}</Typography>
          </View>
        </View>
        <TextChip
          text="Help Requested"
          backgroundColor={colors.pale_teal1}
          style={{ marginHorizontal: 25 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 25,
          }}
        >
          <BigButton
            name="Update Rooms"
            icon={<BedIcon w="40" h="28" fill={colors.orange} />}
            onPress={toggleModal}
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
                <Typography variant="xs-medium">Room Status</Typography>
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={roomStatus}
                  save="value"
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ borderRadius: 15, width: 30, height: 30 }}
                    source={{
                      uri: "https://reactnative.dev/img/tiny_logo.png",
                    }}
                  />
                  <View>
                    <Typography variant="xs-regular">
                      {fullName}
                    </Typography>
                    <Typography variant="xs-regular">
                      {room.position}
                    </Typography>
                  </View>
                </View>
                <Typography variant="xs-medium">Assign Staff</Typography>
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={staff}
                  save="value"
                />
                <Button name="Assign" type="Primary" onPress={onPress} />
              </View>
            </View>
          </Modal>
          <BigButton
            name="Inspect"
            icon={<CheckIcon w="40" h="28" stroke={colors.orange} />}
          />
        </View>
      </SafeAreaView>
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
