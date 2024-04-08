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
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";

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
  const [employeeList, setEmployeeList] = useState([]);
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
    navigation.navigate("SupervisorRoom"  );
  };

  const toStaff = () => {
    navigation.navigate("SupervisorStaff");
  };

  const toRequests = () => {
    navigation.navigate("SupervisorRequest");
  };

  // const handleCheckboxChange = (roomId) => {
  //   console.log('Previous selected rooms:', selectedRooms);

  //   setSelectedRooms((prevSelectedRooms) => {
  //     if (prevSelectedRooms.includes(roomId)) {
  //       console.log(`Room ${roomId} is already selected, removing...`);
  //       const updatedRooms = prevSelectedRooms.filter((ID) => ID !== roomId);
  //       console.log('Updated selected rooms:', updatedRooms);
  //       return updatedRooms;
  //     } else {
  //       console.log(`Room ${roomId} is not selected, adding...`);
  //       const updatedRooms = [...prevSelectedRooms, roomId];
  //       console.log('Updated selected rooms:', updatedRooms);
  //       return updatedRooms;
  //     }
  //   });
  // };

  const handleCheckboxChange = (roomId) => {
    setSelectedRooms((prevSelectedRooms) => {
      if (prevSelectedRooms.includes(roomId)) {
        return prevSelectedRooms.filter((ID) => ID !== roomId);
      } else {
        return [...prevSelectedRooms, roomId];
      }
    });
  };

  const handleRoomStatusCheckboxChange = (roomId) => {
    setUpdateRoom((prevSelectedRooms) => {
      if (prevSelectedRooms.includes(roomId)) {
        return prevSelectedRooms.filter((ID) => ID !== roomId);
      } else {
        return [...prevSelectedRooms, roomId];
      }
    });
  };

  useEffect(() => {
    const apiUrl = baseUrl + "/api/requestItems/requestItemsTblAll";
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    const onFetchRequests = () =>
      axios
        .get(apiUrl, config)
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
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    const onFetchEmployees = () =>
      axios
        .get(apiUrl, config)
        .then((response) => {
          const data = response.data;
          setEmployees(data);
          // console.log("employees");
          // console.log(data);
          const tempEmployeeList = data
            .filter((employee) => employee.employeeType === 2)
            .map((employee) => ({
              key: employee.ID,
              value: `${employee.firstName} ${employee.lastName}`,
            }));
          // console.log("tempEmployeeList");
          setEmployeeList(tempEmployeeList);
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
        });
    onFetchEmployees();
  }, []);

  useEffect(() => {
    const apiUrl = baseUrl + "/api/assignedRooms/all";
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    const onFetchAssignedRooms = () =>
      axios
        .get(apiUrl, config)
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
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    const onFetchRooms = () =>
      axios
        .get(apiUrl, config)
        .then((response) => {
          const data = response.data;
          setRooms(data);
          // console.log("rooms");
          // console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching rooms:", error);
        });

    onFetchRooms();
  }, []);

  const localDate = new Date();
  const today =
    localDate.getFullYear() +
    "-" +
    String(localDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(localDate.getDate()).padStart(2, "0");
  console.log(localDate);

  console.log("today");
  console.log(today);

  const unassignedRooms = rooms.filter((room) => {
    return !assignedRooms.some((assignedRoom) => {
      return (
        assignedRoom.roomID === room.ID &&
        assignedRoom.assignedDateTime.startsWith(today)
      );
    });
  });

  // const roomsList = availableRooms.map((room) => ({
  //   key: room.ID,
  //   value: room.RoomName,
  // }));

  // console.log("available rooms:", unassignedRooms);

  // const employeeList = employees
  //   .filter((employee) => employee.EmployeeType === 2)
  //   .map((employee) => ({
  //     key: employee.ID,
  //     value: `${employee.FirstName} ${employee.LastName}`,
  //   }));

  const assignRoom = () => {
    console.log("employee");
    console.log(assignedEmployee);
    selectedRooms.forEach((roomId) => {
      const assignedRoom = rooms.find((roo) => roo.ID === roomId);
      const assignEmployee = employees.find(
        (emp) => emp.ID === assignedEmployee,
      );
      console.log("assignedDateTime");
      console.log(toLocalISODate(new Date(), "America/Vancouver"));

      const newAssignedRoom = {
        RoomID: assignedRoom.ID,
        RoomStatus: assignedRoom.RoomStatus,
        assignedDateTime: toLocalISODate(new Date(), "America/Vancouver"),
        assignedEmployeeID: assignEmployee.ID,
        cleaningStatus: "To Do",
        isCompleted: false,
        verifiedPhotoUrl: "",
        startTime: toLocalISODate(new Date(), "America/Vancouver"),
        endTime: toLocalISODate(new Date(), "America/Vancouver"),
        cleaningDuration: "2024-03-22T00:00:00.000Z",
        isHelperRequested: false,
        reguestedHelperID: "",
        AdditionalNotes: "",
        inspectionFeedback: "",
        rating: 0,
        inspectionPhotos: "",
        inspectionNotes: "",
      };

      console.log("newAssignedRoom");
      console.log(newAssignedRoom);

      const apiUrl = baseUrl + "/api/assignedrooms/addAssignedRoom";
      const config = {
        headers: {
          Authorization: `Bearer ${accessTokenStore}`,
        },
      };
      axios
        .post(apiUrl, newAssignedRoom, config)
        .then((response) => {
          console.log("Assignment created successfully:", response.data);
          setAssignedRooms([...assignedRooms, newAssignedRoom]);
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
    const localDate = new Date();
    const today =
      localDate.getFullYear() +
      "-" +
      String(localDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(localDate.getDate()).padStart(2, "0");

    return room.cleaningStatus === "To Do" && assignedDate === today;
  });

  const cleanedRoomsToday = assignedRooms.filter((room) => {
    const assignedDate = new Date(room.assignedDateTime)
      .toISOString()
      .split("T")[0];
    const localDate = new Date();
    const today =
      localDate.getFullYear() +
      "-" +
      String(localDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(localDate.getDate()).padStart(2, "0");
    return room.cleaningStatus === "Cleaned" && assignedDate === today;
  });

  const roomStatus = [
    { key: "DueOut", value: "Due Out" },
    { key: "DueIn", value: "Due In" },
    { key: "DueOut-DueIn", value: "Due Out - Due In" },
    { key: "CheckedOut", value: "Checked Out" },
    { key: "CheckedOut-CheckedIn", value: "Checked Out - Checked In" },
    { key: "CheckedIn", value: "Checked In" },
  ];

  const updateRoomStatus = () => {
    updateRoom.forEach((roomId) => {
      const roomToUpdate = rooms.find((roo) => roo.ID === roomId);

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
    });
    toggleUpdateRoomStatusModal();
  };

  function toLocalISODate(date, timeZone) {
    // Create a formatter for the date parts
    const formatter = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      timeZone: timeZone,
      hour12: false,
    });

    // Format the date according to the given timezone and split into parts
    const parts = formatter.formatToParts(date);

    // Reduce parts to an easily accessible key-value map
    const dateParts = parts.reduce((acc, part) => {
      if (part.type !== "literal") {
        acc[part.type] = part.value;
      }
      return acc;
    }, {});

    // Construct the ISO string
    return `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}Z`;
  }

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
              // name="thalha"
              // message="some quote is here just act as this is a quote"
            {employeeDetailsStore.firstName && (
              <MGRoomHeader
              name={employeeDetailsStore.firstName}
              message="some quote is here just act as this is a quote"
              image={employeeDetailsStore.imageURL}
            />
            )}
            
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.bodyContainer}>
          <View style={styles.statusContainer}>
            <BigButton
              name="To Do"
              icon={<BedIcon w="54" h="37" fill={colors.main} />}
              text={toDoRoomsToday.length.toString()}
              variant="h5-medium"
              onPress={toToDoRooms}
            />
            <BigButton
              name="Completed"
              icon={<BedIcon w="54" h="37" fill={colors.teal} />}
              text={cleanedRoomsToday.length.toString()}
              variant="h5-medium"
              onPress={toCompletedRooms}
            />
            <BigButton
              name="Staff"
              icon={
                <ProfileIcon
                  w="40"
                  h="37"
                  stroke={colors.main}
                  fill={colors.main}
                />
              }
              text={employeeList.length.toString()}
              variant="h5-medium"
              onPress={toStaff}
            />
            <BigButton
              name="Pending"
              icon={<RequestIcon w="40" h="30" stroke={colors.main} />}
              text={pendingRequests
                .filter((item) => !item.isCompleted)
                .length.toString()}
              variant="h5-medium"
              onPress={toRequests}
            />
            <BigButton
              name="Assign Rooms"
              variantTitle="h5-regular"
              onPress={toggleAssignRoomModal}
              disabled={unassignedRooms.length === 0}
              width="100%"
            />
            <BigButton
              name="Update Room Status"
              variantTitle="h5-regular"
              onPress={toggleUpdateRoomStatusModal}
              width="100%"
            />
          </View>
          {/* <BigButton
            name="Assign Room"
            icon={<RequestIcon w="40" h="28" stroke={colors.orange} />}
            style={{ width: "90%" }}
            onPress={() => {
              toggleAssignRoomModal();
              console.log(employeeList);
              console.log(employees);
            }}
          /> */}
          {/* {employeeList[0].ID} */}
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
                      {unassignedRooms &&
                        unassignedRooms.map((room) => (
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
                              onValueChange={() => {
                                console.log(
                                  "Checkbox clicked for room ID:",
                                  room.ID,
                                );
                                handleCheckboxChange(room.ID);
                              }}
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
                            value={updateRoom.includes(room.ID)}
                            onValueChange={() =>
                              handleRoomStatusCheckboxChange(room.ID)
                            }
                          />
                          <Typography variant="xs-medium">
                            {room.RoomName}
                          </Typography>
                        </View>
                      ))}
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
    paddingVertical: 20,
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 20,
    justifyContent: "center",
    // alignItems: "center",
    paddingVertical: 40,
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
