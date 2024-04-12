import { Image, View, StyleSheet } from "react-native";
import Typography from "../Typography/Typography";

const ImageDisplay = ({ type, source, text }) => {
  return (
    <View style={{ marginVertical:16}}>
      <Image
        style={type === "large" ? styles.largeImage : styles.smallImage}
        source={{ uri: source }}
      />
      {text ? (
        <Typography
          style={type === "large" ? styles.largeText : styles.smallText}
          variant={type === "large" ? "title-medium" : "xs-regular"}
        >
          {text}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  largeImage: {
    width: 220,
    height: 220,
    borderRadius: 6,
  },
  smallImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  largeText: {
    marginTop: 10,
    textAlign: "center",
  },
  smallText: {
    
  },
});

export default ImageDisplay;
