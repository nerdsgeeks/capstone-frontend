import React, { useState, useEffect } from "react";
import { StyleSheet, View, Modal } from "react-native";
import MGRoomHeader from "../../components/MGRoomHeader/MGRoomHeader";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import BigButton from "../../components/BigButton/BigButton";
import BedIcon from "../../SVG/BedIcon";
import { colors } from "../../../themes/themes";

import RequestIcon from "../../SVG/RequestIcon";
import CloseIcon from "../../SVG/CloseIcon";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import useBaseUrl from "../../hooks/useBaseUrl";
import { Checkbox } from "expo-checkbox";
import Typography from "../../components/Typography/Typography";
import ProfileIcon from "../../SVG/ProfileIcon";

const SupervisorHome = ({ navigation }) => {
  const [isAssignRoomModalOpen, setIsAssignRoomModalOpen] = useState(false);
  const [isUpdateRoomStatusModalOpen, setIsUpdateRoomStatusModalOpen] =
    useState(false);
  const [employees, setEmployees] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [assignedRooms, setAssignedRooms] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  // For Assign Rooms Modal
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [assignedEmployee, setAssignedEmployee] = useState("");

  // For updateRooms Modal
  const [updateRoom, setUpdateRoom] = useState([]);
  const [updateStatus, setUpdateStatus] = useState("");
  const baseUrl = useBaseUrl();

  const toggleAssignRoomModal = () => {
    setIsAssignRoomModalOpen(!isAssignRoomModalOpen);
  };

  const toggleUpdateRoomStatusModal = () => {
    setIsUpdateRoomStatusModalOpen(!isUpdateRoomStatusModalOpen);
  };

  const toToDoRooms = () => {
    navigation.navigate("SupervisorRoom");
  };

  const toCompletedRooms = () => {
    navigation.navigate("SupervisorRoom");
  };

  const toStaff = () => {
    navigation.navigate("SupervisorStaff");
  };

  const toRequests = () => {
    navigation.navigate("SupervisorRequest");
  };

  const handleCheckboxChange = (roomId) => {
    setSelectedRooms((prevSelectedRooms) => {
      if (prevSelectedRooms.includes(roomId)) {
        return prevSelectedRooms.filter((ID) => ID !== roomId);
      } else {
        return [...prevSelectedRooms, roomId];
      }
    });
  };

  useEffect(() => {
    const apiUrl = baseUrl + "/api/requestItems/requestItemsTblAll";
    const onFetchRequests = () =>
      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          setPendingRequests(data);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
        });
    onFetchRequests();
  }, []);

  useEffect(() => {
    const apiUrl = baseUrl + "/api/employees/all";
    const onFetchEmployees = () =>
      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          setEmployees(data);
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
        });
    onFetchEmployees();
  }, []);

  useEffect(() => {
    const apiUrl = baseUrl + "/api/assignedRooms/all";
    const onFetchAssignedRooms = () =>
      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          setAssignedRooms(data);
        })
        .catch((error) => {
          console.error("Error fetching assigned rooms:", error);
        });
    onFetchAssignedRooms();
  }, []);

  useEffect(() => {
    const apiUrl = baseUrl + "/api/rooms/all";
    const onFetchRooms = () =>
      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          setRooms(data);
        })
        .catch((error) => {
          console.error("Error fetching rooms:", error);
        });
    onFetchRooms();
  }, []);

  const roomsList = rooms.map((room) => ({
    key: room.ID,
    value: room.RoomName,
  }));

  const employeeList = employees
    .filter((employee) => employee.EmployeeType === 2)
    .map((employee) => ({
      key: employee.ID,
      value: `${employee.FirstName} ${employee.LastName}`,
    }));

  const assignRoom = () => {
    console.log("employee");
    console.log(assignedEmployee);
    selectedRooms.forEach((roomId) => {
      const assignedRoom = rooms.find((roo) => roo.ID === roomId);
      const assignEmployee = employees.find(
        (emp) => emp.ID === assignedEmployee,
      );

      const newAssignedRoom = {
        RoomID: assignedRoom.ID,
        RoomStatus: assignedRoom.RoomStatus,
        assignedDateTime: new Date().toISOString(),
        assignedEmployeeID: assignEmployee.ID,
        cleaningStatus: "To Do",
        isCompleted: false,
        verifiedPhotoUrl: "",
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        cleaningDuration: new Date().toISOString(),
        isHelperRequested: false,
        reguestedHelperID: "",
        AdditionalNotes: "N/A",
        inspectionFeedback: "",
        rating: 0,
        inspectionPhotos: "",
        inspectionNotes: "",
      };

      console.log("newAssignedRoom");
      console.log(newAssignedRoom);

      const apiUrl = baseUrl + "/api/assignedrooms/addAssignedRoom";

      axios
        .post(apiUrl, newAssignedRoom)
        .then((response) => {
          console.log("Assignment created successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error creating assignment:", error);
        });

      toggleAssignRoomModal();
    });
  };

  const toDoRoomsToday = assignedRooms.filter((room) => {
    const assignedDate = new Date(room.assignedDateTime)
      .toISOString()
      .split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    return room.cleaningStatus === "To Do" && assignedDate === today;
  });

  const cleanedRoomsToday = assignedRooms.filter((room) => {
    const assignedDate = new Date(room.assignedDateTime)
      .toISOString()
      .split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    return room.cleaningStatus === "Completed" && assignedDate === today;
  });

  const roomStatus = [
    { key: "DUEOUT", value: "Due Out" },
    { key: "DUEIN", value: "Due In" },
    { key: "DUEOUT-DUEIN", value: "Due Out - Due In" },
    { key: "CHECKEDOUT", value: "Checked Out" },
    { key: "CHECKEDOUT-CHECKEDIN", value: "Checked Out - Checked In" },
    { key: "CHECKIN", value: "Checked In" },
  ];

  const updateRoomStatus = () => {
    console.log(updateRoom);
    const roomToUpdate = rooms.find((roo) => roo.ID === updateRoom);
    const updateRoomItem = {
      ID: roomToUpdate.ID,
      RoomName: roomToUpdate.RoomName,
      RoomTypeID: roomToUpdate.RoomTypeID,
      Floor: roomToUpdate.Floor,
      RoomStatus: updateStatus,
      RoomImageUrl: roomToUpdate.RoomImageUrl,
      RoomTier: roomToUpdate.RoomTier,
    };

    console.log(updateRoomItem);
    const apiUrl = baseUrl + "/api/rooms/updateroom";

    axios
      .put(apiUrl, updateRoomItem)
      .then((response) => {
        console.log("Room updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating updating room:", error);
      });

    toggleUpdateRoomStatusModal();
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={["#F89C7B", "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          locations={[0.01, 0.7, 0.92, 1.0]}
          style={styles.headerContainer}
        >
          <SafeAreaView>
            <MGRoomHeader
              name="thalha"
              message="some quote is here just act as this is a quote"
            />
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.bodyContainer}>
          <View style={styles.statusContainer}>
            <BigButton
              name="To Do"
              icon={<BedIcon w="40" h="28" fill={colors.orange} />}
              text={toDoRoomsToday.length.toString()}
              variant="h5-medium"
              onPress={toToDoRooms}
            />
            <BigButton
              name="Completed"
              icon={<BedIcon w="40" h="28" fill={colors.orange} />}
              text={cleanedRoomsToday.length.toString()}
              variant="h5-medium"
              onPress={toCompletedRooms}
            />
            <BigButton
              name="Staff"
              icon={
                <ProfileIcon
                  w="40"
                  h="28"
                  stroke={colors.orange}
                  fill={colors.orange}
                />
              }
              text={employeeList.length.toString()}
              variant="h5-medium"
              onPress={toStaff}
            />
            <BigButton
              name="Pending"
              icon={<RequestIcon w="40" h="28" stroke={colors.orange} />}
              text={pendingRequests
                .filter((item) => !item.isCompleted)
                .length.toString()}
              variant="h5-medium"
              onPress={toRequests}
            />
            <BigButton name="Assign Rooms" onPress={toggleAssignRoomModal} />
            <BigButton
              name="Update Room Status"
              onPress={toggleUpdateRoomStatusModal}
            />
          </View>

          {isAssignRoomModalOpen && (
            <Modal
              onRequestClose={toggleAssignRoomModal}
              animationType="fade"
              transparent={true}
            >
              <View style={styles.modalOverlay}>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.AssignRoomModalContainer}>
                    <CloseIcon onPress={toggleAssignRoomModal} />
                    <Typography variant="h5-black">Assign Room</Typography>
                    <View style={{ gap: 4 }}>
                      <Typography variant="xs-medium">
                        Select Room Number
                      </Typography>
                      {rooms &&
                        rooms.map((room) => (
                          <View
                            key={room.ID}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Checkbox
                              value={selectedRooms.includes(room.ID)}
                              onValueChange={() =>
                                handleCheckboxChange(room.ID)
                              }
                              color={
                                selectedRooms.includes(room.ID)
                                  ? colors.teal
                                  : undefined
                              }
                            />
                            <Typography variant="xs-medium">
                              {room.RoomName}
                            </Typography>
                          </View>
                        ))}
                    </View>
                    <View style={{ gap: 4 }}>
                      <Typography variant="xs-medium">Assign Staff</Typography>
                      <SelectList
                        setSelected={(key) => setAssignedEmployee(key)}
                        data={employeeList}
                        save="key"
                        boxStyles={{
                          borderColor: colors.n30,
                          borderRadius: 12,
                          alignItems: "center",
                          width: "100%",
                        }}
                        dropdownStyles={{ borderRadius: 12 }}
                      />
                    </View>
                    <View style={styles.buttonStyles}>
                      <Button
                        name="Assign"
                        type="primary"
                        onPress={assignRoom}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          )}

          {isUpdateRoomStatusModalOpen && (
            <Modal
              onRequestClose={toggleUpdateRoomStatusModal}
              animationType="fade"
              transparent={true}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.AssignRoomModalContainer}>
                  <CloseIcon onPress={toggleUpdateRoomStatusModal} />

                  <Typography variant="h5-black">Update Room Status</Typography>
                  <View style={{ gap: 4 }}>
                    <Typography variant="xs-medium">Room Number</Typography>
                    <SelectList
                      setSelected={(key) => setUpdateRoom(key)}
                      data={roomsList}
                      save="key"
                    />
                  </View>
                  <View style={{ gap: 4 }}>
                    <Typography variant="xs-medium">Room Status</Typography>
                    <SelectList
                      setSelected={(key) => setUpdateStatus(key)}
                      data={roomStatus}
                      save="key"
                    />
                  </View>

                  <View style={styles.buttonStyles}>
                    <Button
                      name="Update"
                      type="primary"
                      onPress={updateRoomStatus}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.n0,
  },
  headerContainer: {
    width: "100%",
    borderBottomLeftRadius: 60,
    paddingHorizontal: 26,
    paddingTop: 7,
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
    // alignItems: "center",
    paddingVertical: 26,
  },
  bodyContainer: {
    paddingHorizontal: 26,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
  },
  AssignRoomModalContainer: {
    flexGrow: 1,
    margin: 15,
    gap: 16,
    backgroundColor: colors.n0,
    borderRadius: 20,
    paddingHorizontal: 26,
    paddingVertical: 15,
    alignItems: "center",
  },
});

export default SupervisorHome;
