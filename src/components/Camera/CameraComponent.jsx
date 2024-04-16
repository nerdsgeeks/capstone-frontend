import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CameraButtonSvg from "../../SVG/CameraButtonSvg";
import BackIcon from "../../SVG/BackIcon";
import CheckIcon from "../../SVG/CheckIcon";

const CameraComponent = ({ navigation }) => {
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
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
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

  const confirmImages = () => {
    navigation.navigate("StaffCleanedRoomScreen", { images });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <ScrollView horizontal={true}>
            <View style={styles.imageContainer}>
              {images.map((image, index) => (
                <TouchableOpacity key={index}>
                  <Image
                    key={index}
                    source={{ uri: `data:image/jpg;base64,${image}` }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon w="26" h="26" />
            </TouchableOpacity>
            <TouchableOpacity onPress={takeImage}>
              <CameraButtonSvg onPress={takeImage} />
            </TouchableOpacity>
            <TouchableOpacity>
              <CheckIcon w={30} h={30} fill="white" onPress={confirmImages} />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
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
    justifyContent: "flex-end",
  },

  buttonContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",

    paddingVertical: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 100,
    bottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 26,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginHorizontal: 5,
  },
};
