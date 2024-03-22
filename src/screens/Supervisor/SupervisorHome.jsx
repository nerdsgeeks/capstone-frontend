import React, { useState, useEffect } from "react";
import { StyleSheet, View, Modal } from "react-native";
import MGRoomHeader from "../../components/MGRoomHeader/MGRoomHeader";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import BigButton from "../../components/BigButton/BigButton";
import BedIcon from "../../SVG/BedIcon";
import { colors } from "../../../themes/themes";
import PersonIcon from "../../SVG/PersonIcon";
import RequestIcon from "../../SVG/RequestIcon";
import CloseIcon from "../../SVG/CloseIcon";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import useBaseUrl from "../../hooks/useBaseUrl";
import { Checkbox } from "expo-checkbox";
import Typography from "../../components/Typography/Typography";

const SupervisorHome = () => {
  const [isAssignRoomModalOpen, setIsAssignRoomModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [employee, setEmployee] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const baseUrl = useBaseUrl();

  const toggleAssignRoomModal = () => {
    setIsAssignRoomModalOpen(!isAssignRoomModalOpen);
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
    const apiUrl = baseUrl + "/api/employees/all";
    const onFetchEmployees = () =>
      axios
        .get(apiUrl)
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
          // console.log(tempEmployeeList);
          setEmployeeList(tempEmployeeList);
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
        });

    const apiRoomsUrl = baseUrl + "/api/rooms/all";
    const onFetchRooms = () =>
      axios
        .get(apiRoomsUrl)
        .then((response) => {
          const data = response.data;
          setRooms(data);
          // console.log("rooms");
          // console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching rooms:", error);
        });

    onFetchEmployees();
    onFetchRooms();
  }, []);

  const assignRoom = () => {
    console.log("employee");
    console.log(employee);
    selectedRooms.forEach((roomId) => {
      const assignedRoom = rooms.find((roo) => roo.ID === roomId);
      const assignedEmployee = employees.find((emp) => emp.ID === employee);

      const newAssignedRoom = {
        RoomID: assignedRoom.ID,
        RoomStatus: assignedRoom.RoomStatus,
        assignedDateTime: new Date().toISOString(),
        assignedEmployeeID: assignedEmployee.ID,
        cleaningStatus: "To Do",
        isCompleted: false,
        verifiedPhotoUrl: "",
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
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

      axios
        .post(apiUrl, newAssignedRoom)
        .then((response) => {
          console.log("Assignment created successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error creating assignment:", error);
        });
    });

    // const newAssignment = {
    //   RoomID: assignedRoom.ID,
    //   RoomStatus: assignedRoom.RoomStatus,
    //   assignedDateTime: new Date().toISOString(),
    //   assignedEmployeeID: assignedEmployee.EmployeeID,
    //   cleaningStatus: "To Do",
    //   isCompleted: false,
    //   verifiedPhotoUrl: "",
    //   startTime: "",
    //   endTime: "",
    //   cleaningDuration: "",
    //   isHelperRequested: false,
    //   reguestedHelperID: null,
    //   AdditionalNotes: "N/A",
    //   inspectionFeedback: "",
    //   rating: 0,
    //   inspectionPhotos: "",
    //   inspectionNotes: "",
    // };

    // console.log(newAssignment);

    // axios
    //     .get(apiUrl)
    //     .then((response) => {
    //       const data = response.data;
    //       console.log(data);
    //       setRooms(data);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching rooms:", error);
    //     });

    // axios.post(`${baseUrl}/api/assignments`, newAssignment)
    //   .then(response => {
    //     console.log('Assignment created successfully:', response.data);
    //     // Optionally perform any further actions upon successful assignment creation
    //   })
    //   .catch(error => {
    //     console.error('Error creating assignment:', error);
    //     // Optionally handle error cases
    //   });
    // };
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={["#F89C7B", "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          locations={[0.01, 0.7, 0.92, 1.0]}
          style={styles.headerGradient}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <MGRoomHeader
              name="thalha"
              message="some quote is here just act as this is a quote"
            />
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.bodyContainer}>
          <View style={styles.statusContainer}>
            <View style={styles.upperContainer}>
              <BigButton
                name="To Do"
                icon={<BedIcon w="40" h="28" fill={colors.orange} />}
                text="86"
              />
              <BigButton
                name="Completed"
                icon={<BedIcon w="40" h="28" fill={colors.orange} />}
                text="86"
              />
            </View>
            <View style={styles.lowerContainer}>
              <BigButton
                name="Staff Active"
                icon={<PersonIcon w="40" h="28" fill={colors.orange} />}
                text="86"
              />
              <BigButton
                name="Pending"
                icon={<RequestIcon w="40" h="28" stroke={colors.orange} />}
                text="86"
              />
            </View>
          </View>
          <BigButton
            name="Assign Room"
            icon={<RequestIcon w="40" h="28" stroke={colors.orange} />}
            style={{ width: "90%" }}
            onPress={() => {
              toggleAssignRoomModal();
              console.log(employeeList);
              console.log(employees);
            }}
          />
          {/* {employeeList[0].ID} */}
          {isAssignRoomModalOpen && (
            <Modal
              onRequestClose={toggleAssignRoomModal}
              animationType="fade"
              transparent={true}
            >
              <View style={styles.modalOverlay}>
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
                            onValueChange={() => handleCheckboxChange(room.ID)}
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
                      setSelected={(key) => setEmployee(key)}
                      data={employeeList}
                      save="key"
                    />
                  </View>

                  <View style={styles.buttonStyles}>
                    <Button name="Assign" type="primary" onPress={assignRoom} />
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
    backgroundColor: "#8fcbbc",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerGradient: {
    width: "100%",
    height: "20%",
    borderBottomLeftRadius: 60,
    padding: 20,
  },
  statusContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  upperContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
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
