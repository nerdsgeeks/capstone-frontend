import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const CameraComponent = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);
  const [images, setImages] = useState([]);

  const cameraRef = useRef(null);

  const takeImage = async () => {
    try {
      if (cameraRef.current) {
        const { base64 } = await cameraRef.current.takePictureAsync({
          base64: true,
        });
        setImages([...images, base64]);
      }
    } catch (error) {
      console.error("Error while taking picture:", error);
    }
  };
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await requestPermission();
      setHasPermission(status === "granted");
    };
    getPermission();
  }, []);

  function toggleCameraType() {
    setType(
      type === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Ionicons
              name="camera-reverse"
              size={50}
              color="white"
              onPress={toggleCameraType}
            />
            <Ionicons
              name="camera"
              size={50}
              color="white"
              onPress={takeImage}
            />
          </TouchableOpacity>
        </View>
      </Camera>

      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={imageView}>
          <Image
            key={index}
            source={{ uri: `data:image/jpg;base64,${image}` }}
            style={styles.image}
          />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CameraComponent;

const styles = {
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
};
