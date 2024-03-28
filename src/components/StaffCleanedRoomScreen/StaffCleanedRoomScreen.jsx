import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, TextInput } from "react-native";
import Typography from "../Typography/Typography";
import ClockIcon from "../../SVG/ClockIcon";
import AddNote from "../AddNote/AddNote";
import Button from "../Button/Button";
import useBaseUrl from "../../hooks/useBaseUrl";
import { useRoomDetailsStore } from "../../store/roomStore";
import axios from "axios";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";

const StaffCleanedRoomScreen = ({ navigation, route }) => {
  const { images } = route.params;
  const baseUrl = useBaseUrl();
  const roomDetails = useRoomDetailsStore((state) => state.roomDetailsStore);
  const updateRoomDetailsStore = useRoomDetailsStore(
    (state) => state.updateRoomDetailsStore,
  );
  // console.log("roomDetails");
  // console.log(roomDetails);

  const [noteText, setNoteText] = useState("");
  const [isNoteTextTextFocused, setIsNoteTextTextFocused] = useState(false);

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
  const handleNoteTextChange = (text) => {
    setNoteText(text);
  };

  const updateSelectedItemWithNote = () => {
    const updatedRoomDetails = {
      ...roomDetails,
      inspectionNotes: noteText,
    };
    updateRoomDetailsStore(updatedRoomDetails);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(baseUrl + "/api/s3/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images }),
      });
      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      const data = await response.json();
      console.log("Success:", data);

      let inspectionPhotos = "";
      if (data.uploadedUrls.length > 0) {
        inspectionPhotos = data.uploadedUrls.join(",");
      }
      console.log(inspectionPhotos);

      const tempAssignedRoom = {
        ID: roomDetails.ID,
        roomID: roomDetails.roomID,
        assignedDateTime: roomDetails.assignedDateTime,
        assignedEmployeeID: roomDetails.assignedEmployeeID,
        cleaningStatus: "Cleaned",
        isCompleted: roomDetails.isCompleted,
        verifiedPhotoUrl: roomDetails.verifiedPhotoUrl,
        startTime: roomDetails.startTime,
        endTime: roomDetails.endTime,
        cleaningDuration: roomDetails.cleaningDuration,
        isHelperRequested: roomDetails.isHelperRequested,
        reguestedHelperID: roomDetails.reguestedHelperID,
        AdditionalNotes: roomDetails.AdditionalNotes,
        inspectionFeedback: roomDetails.inspectionFeedback,
        rating: roomDetails.ID,
        inspectionPhotos: inspectionPhotos,
        inspectionNotes: noteText,
        isHelperRequestedApproved: roomDetails.isHelperRequestedApproved,
        helperRequestedAdditionalNotes:
          roomDetails.helperRequestedAdditionalNotes,
      };
      onUpdateAssignedRoom(tempAssignedRoom);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onUpdateAssignedRoom = (tempAssignedRoom) => {
    const apiUrl = baseUrl + "/api/assignedrooms/updateAssignedRoom";
    console.log(apiUrl);
    console.log("tempAssignedRoom");
    console.log(tempAssignedRoom);
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    axios
      .put(apiUrl, tempAssignedRoom, config)
      .then((response) => {
        const data = response.data;
        // console.log("data");
        // console.log(data);
        roomDetails.cleaningStatus = "Cleaned";
        updateRoomDetailsStore(roomDetails);
        navigation.navigate("RoomDetail", {});
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Typography variant="h5-black">Job Well Done</Typography>
      </View>
      <View style={styles.imageConatiner}>
        <Image
          source={require("./../../../assets/request-help-modal-image.png")}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.timeContainer}>
        <ClockIcon w="22" h="22" />
        <Typography variant="body-regular">
          {
            new Date(roomDetails.cleaningDuration)
              .toISOString()
              .split("T")[1]
              .split(".")[0]
          }
        </Typography>
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.multipleImageContainer}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: `data:image/jpg;base64,${image}` }}
              style={styles.imageStyle}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.addNoteContainer}>
        <Typography variant="h5-black">Add Note</Typography>
        {/* <AddNote /> */}
        <TextInput
          style={[
            styles.textInputStyle,
            {
              padding: isNoteTextTextFocused ? 2 : 10,
              paddingLeft: isNoteTextTextFocused ? 20 : 36,
              height: isNoteTextTextFocused ? 80 : 40,
            },
          ]}
          placeholder="Note"
          onFocus={() => setIsNoteTextTextFocused(true)}
          onBlur={() => {
            setIsNoteTextTextFocused(false);
            updateSelectedItemWithNote();
          }}
          onChangeText={handleNoteTextChange} // Update state on text change
          value={noteText}
        />
      </View>
      <Button name="Done" type="primary" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
    alignItems: "center",
  },

  imageConatiner: {
    padding: 20,
  },
  timeContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  multipleImageContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    //need to  add width 75 and 75 once images areggetched
  },
  imageStyle: {
    width: 140,
    height: 110,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginTop: 5,
  },
});

export default StaffCleanedRoomScreen;
