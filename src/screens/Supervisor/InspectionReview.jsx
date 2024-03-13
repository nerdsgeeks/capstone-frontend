import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Typography from "../../components/Typography/Typography";
import ImageDisplay from "../../components/ImageDisplay/ImageDisplay";
import Button from "../../components/Button/Button";
import StarIcon from "../../SVG/StarIcon";
import ClockIcon from "../../SVG/ClockIcon";
import AddNote from "../../components/AddNote/AddNote";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../themes/themes";
import Gallery from "../../components/Gallery/Gallery";

const InspectionReview = ({ mins, secs }) => {
  const [rating, setRating] = useState(0);
  const onStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const submittedHandler = () => {
    console.log("submitted!");
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

  const images = [
    'https://picsum.photos/id/237/200/300',
    'https://picsum.photos/id/240/200/300',
    'https://fastly.picsum.photos/id/294/200/200.jpg?hmac=tSuqBbGGNYqgxQ-6KO7-wxq8B4m3GbZqQAbr7tNApz8',
    // Add more image URIs as needed
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center", flexDirection: "column", gap: 12 }}>
          <Typography variant="h5-black">Inspection Review</Typography>
          <Gallery images={images}/>
          <View style={styles.starsContainer}>{renderStars(rating)}</View>
          <View style={styles.timer}>
            <ClockIcon fill={colors.teal} />
            <Typography variant="small-medium">{`${mins} mins ${secs} secs`}</Typography>
          </View>
          <AddNote />
        </View>
        <View style={{ flexDirection: "row", gap: 16, paddingTop: 30, alignItems: "center", justifyContent: "center" }}>
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
  timer: {
    flexDirection: "row",
    backgroundColor: colors.pale_teal2,
    paddingHorizontal: 24,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
export default InspectionReview;