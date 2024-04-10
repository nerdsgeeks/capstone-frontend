import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Typography from "../../components/Typography/Typography";
import ImageDisplay from "../../components/ImageDisplay/ImageDisplay";
import Button from "../../components/Button/Button";
import StarIcon from "../../SVG/StarIcon";
import ClockIcon from "../../SVG/ClockIcon";
import PlusIcon from "../../SVG/PlusIcon";
import AddNote from "../../components/AddNote/AddNote";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../themes/themes";
import Gallery from "../../components/Gallery/Gallery";
import axios from "axios";
import useBaseUrl from "../../hooks/useBaseUrl";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";

const InspectionReview = ({ route, navigation }) => {
  const [rating, setRating] = useState(0);
  const [isAddNoteFocused, setIsAddNoteFocused] = useState(false);
  const [modalNoteText, setModalNoteText] = useState("");
  const baseUrl = useBaseUrl();
  const room = route.params.room;
  console.log(" InspectionReview room");
  console.log(room);

  const accessTokenStore = useAccessTokenStore(
    (state) => state.accessTokenStore,
  );

  const handlemodalNoteTextChange = (text) => {
    setModalNoteText(text);
  };

  console.log(modalNoteText);

  const updateSelectedItemWithNote = () => {
    const updatedSelectedItem = { ...selectedItem, note: modalNoteText };
    setSelectedItem(updatedSelectedItem);
  };

  const submittedHandler = () => {
    const roomReviewed = {
      ID: room.ID,
      roomID: room.roomID,
      assignedDateTime: room.assignedDateTime,
      assignedEmployeeID: room.assignedEmployeeID,
      cleaningStatus: "Approved",
      isCompleted: true,
      verifiedPhotoUrl: room.verifiedPhotoUrl,
      startTime: room.startTime,
      endTime: room.endTime,
      cleaningDuration: room.cleaningDuration,
      isHelperRequested: true,
      reguestedHelperID: room.reguestedHelperID,
      AdditionalNotes: room.AdditionalNotes,
      inspectionFeedback: modalNoteText,
      rating: rating,
      inspectionPhotos: room.inspectionPhotos,
      inspectionNotes: room.inspectionNotes,
      isHelperRequestedApproved: room.isHelperRequestedApproved,
      helperRequestedAdditionalNotes: room.helperRequestedAdditionalNotes,
    };

    console.log("roomReviewed: ", roomReviewed);

    const apiUrl = baseUrl + "/api/assignedrooms/updateAssignedRoom";
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    axios
      .put(apiUrl, roomReviewed, config)
      .then((response) => {
        console.log("Assign Room updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating updating room:", error);
      });

    navigation.goBack(); // Navigate back to the previous screen
    navigation.goBack();
  };

  const onStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const renderStars = (currentRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => onStarPress(i)}>
          <StarIcon
            w="30"
            h="30"
            fill={currentRating >= i ? colors.teal : colors.n20}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  const images = room.inspectionPhotos.split(",");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={{ alignItems: "center", flexDirection: "column", gap: 12 }}
        >
          <Typography variant="h5-black">Inspection Review</Typography>
          <Gallery images={images} />
          <View style={styles.starsContainer}>{renderStars(room.rating)}</View>
          <View style={styles.timer}>
            <ClockIcon fill={colors.teal} />
            <Typography variant="small-medium">
              {
                new Date(room.cleaningDuration)
                  .toISOString()
                  .split("T")[1]
                  .split(".")[0]
              }
            </Typography>
            {/* <Typography variant="small-medium">{`${mins} mins ${secs} secs`}</Typography> */}
          </View>
          <View style={styles.modalForm}>
            <Typography variant="body-medium">Add Note</Typography>
            <View>
              {!isAddNoteFocused && (
                <View style={{ position: "absolute", top: 12, left: 10 }}>
                  <PlusIcon fill={colors.n50} />
                </View>
              )}
              <TextInput
                style={[
                  styles.requestAddToCartModalInput,
                  {
                    padding: isAddNoteFocused ? 2 : 10,
                    paddingLeft: isAddNoteFocused ? 20 : 36,
                    height: 44,
                  },
                ]}
                placeholder="Note"
                onFocus={() => setIsAddNoteFocused(true)}
                onBlur={() => {
                  setIsAddNoteFocused(false);
                  updateSelectedItemWithNote();
                }}
                onChangeText={handlemodalNoteTextChange} // Update state on text change
                value={modalNoteText}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            paddingTop: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button type="primary" name="Submit" onPress={submittedHandler} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
  },
  requestAddToCartModalInput: {
    borderWidth: 1,
    borderColor: colors.n30,
    borderRadius: 12,
  },
  timer: {
    flexDirection: "row",
    backgroundColor: colors.pale_teal2,
    paddingHorizontal: 24,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
export default InspectionReview;
