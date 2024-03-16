import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import Typography from "../Typography/Typography";
import ClockIcon from "../../SVG/ClockIcon";
import AddNote from "../AddNote/AddNote";
import Button from "../Button/Button";
import useBaseUrl from "../../hooks/useBaseUrl";

const StaffCleanedRoomScreen = ({navigation,route}) => {
  
  const {images} = route.params
const baseUrl = useBaseUrl();
const handleSubmit = async () => {
  try {
    const response = await fetch(baseUrl+ "/api/s3/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images }),
    });
    if (!response.ok) {
      throw new Error('Failed to upload images');
    }

    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
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
        <Typography variant="body-regular">20:00:00</Typography>
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
        <AddNote />
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
});

export default StaffCleanedRoomScreen;
