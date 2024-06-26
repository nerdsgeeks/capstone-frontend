import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import Typography from "../components/Typography/Typography";
import { colors } from "../../themes/themes";

const LoadingScreen = ({}) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? "" : prevDots + "."));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.background}
        resizeMode="repeat"
      >
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={require("../../assets/illustrations/blob_2.gif")}
          />
          <Typography variant="body-medium">loading{dots}</Typography>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  image: {
    width: 200,
    height: 240,
  },
});

export default LoadingScreen;
