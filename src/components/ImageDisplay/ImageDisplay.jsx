import { Image, View, StyleSheet } from "react-native";
import Typography from "../Typography/Typography";

const ImageDisplay = ({ type, source, text }) => {
  return (
    <View>
      <Image
        style={type === "large" ? styles.largeImage : styles.smallImage}
        source={{ uri: source }}
      />
      {text ? (
        <Typography
          style={type === "large" ? styles.largeText : styles.smallText}
          variant={type === "large" ? "body-medium" : "xs-regular"}
        >
          {text}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  largeImage: {
    width: 160,
    height: 160,
    borderRadius: 6,
  },
  smallImage: {
    width: 75,
    height: 75,
    borderRadius: 6,
  },
  largeText: {
    width: 160,
    height: 160,
    marginTop: 10,
  },
  smallText: {
    width: 75,
    height: 75,
  },
});

export default ImageDisplay;
