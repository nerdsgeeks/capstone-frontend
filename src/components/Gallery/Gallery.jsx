import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { colors } from "../../../themes/themes";

const Gallery = ({ images }) => {
  const [bigImageUri, setBigImageUri] = useState(images[0]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(images[0]);
  const [scale, setScale] = useState(1);

  const handleZoomEvent = (event) => {
    setScale(event.nativeEvent.scale);
  };

  const handleZoomStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setScale(1);
    }
  };

  const selectThumbnail = (image) => {
    setBigImageUri(image);
    setSelectedThumbnail(image);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler
        onGestureEvent={handleZoomEvent}
        onHandlerStateChange={handleZoomStateChange}
      >
        <Image
          source={{ uri: bigImageUri }}
          style={[
            styles.bigImage,
            { width: 180, aspectRatio: 1, borderRadius: 6, transform: [{ scale }] },
          ]}
          resizeMode="cover"
        />
      </PinchGestureHandler>

      <View style={styles.thumbnailContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectThumbnail(image)}
            style={[
                styles.thumbnailWrapper,
                selectedThumbnail === image && styles.selectedThumbnail, // Added this line
                index === images.length - 1 && styles.lastThumbnail,
            ]}
          >
            <Image source={{ uri: image }} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  bigImage: {
    alignSelf: "center",
    zIndex: 200,
  },
  thumbnailContainer: {
    flexDirection: "row",
    alignSelf: "center",
    padding: 10,
  },
  thumbnailWrapper: {
    marginRight: 10,
    borderRadius: 8,
  },
  lastThumbnail: {
    marginRight: 0,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: colors.main,
  },
});

export default Gallery;
