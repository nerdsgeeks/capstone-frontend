import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
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
import BackIcon from "../../SVG/BackIcon";
import PlusIcon from "../../SVG/PlusIcon";
import { colors } from "../../../themes/themes";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    try {
      const response = await fetch(baseUrl + "/api/s3/upload", {
        method: "POST",
        headers: {
          ...config.headers,
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

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={{ flexGrow: 1,}}>
        <SafeAreaView style={styles.headerStyle}>
          <TouchableOpacity onPress={goBack} style={{ alignSelf: "flex-start", paddingBottom: 50}}>
          <BackIcon w="30" h="30"/>
          </TouchableOpacity>
        
          <Typography variant="h5-black">Nice Job!</Typography>
        
        <View style={styles.imageConatiner}>
          <Image
            source={require("./../../../assets/illustrations/Complete-Room.png")}
            style={{width: 125.33,
              height: 140}}
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
        <View style={{paddingTop: 20, width: "100%", gap: 4}}>
          <Typography variant="small-medium">Add Room Observations</Typography>
          {/* <AddNote /> */}
          {!isNoteTextTextFocused && (
                <View style={{ position: "absolute", bottom: 12, left: 10 }}>
                  <PlusIcon fill={colors.n50} />
                </View>
              )}
          <TextInput
            style={[
              styles.textInputStyle,
              {
                padding: 2,
                paddingLeft: isNoteTextTextFocused ? 20 : 36,
                height: 44,
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
        <View style={{ paddingTop: 50}}>
          <Button name="Request Inspection" type="primary" onPress={handleSubmit} />
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:45,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  headerStyle: {
    gap: 16,
    justifyContent: "center",
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
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginTop: 5,
  },
});

export default StaffCleanedRoomScreen;
