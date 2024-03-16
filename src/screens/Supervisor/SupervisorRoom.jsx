import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import { LinearGradient } from "expo-linear-gradient";
import SupervisorRoomMain from "./SupervisorRoomMain";
import CalendarIcon from "../../SVG/CalendarIcon";
import { useEffect } from "react";
import useBaseUrl from "../../hooks/useBaseUrl";
import axios from "axios";


const SupervisorRoom = ({navigation}) => {

const [rooms, setRooms] = useState([]);

const baseUrl = useBaseUrl();

useEffect(() => {
  fetchRooms().then(setRooms);
}, []);

const fetchRooms = async () => {

  axios.get(`${baseUrl}/api/assignedrooms/all`).then((response) => {
    console.log("response", response.data);
    setRooms(response.data);
  });
};
  const onPress = (room) => {
    console.log("room", room)
    navigation.navigate("SupervisorRoomDetail", { room });
  }

  const date = new Date();
  const showDate =
    date.toLocaleString("default", { day: "numeric" }) +
    " " +
    date.toLocaleString("default", { month: "short" });


  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <LinearGradient
        colors={["#F89C7B", "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        locations={[0.01, 0.7, 0.92, 1.0]}
        style={styles.headerContainer}
      >
        <SafeAreaView>
          <SupervisorRoomHeader title="Rooms" icon={<CalendarIcon />} text={showDate}/>
        </SafeAreaView>
      </LinearGradient>
      <View style={styles.bodyContainer}>
        <SupervisorRoomMain rooms={rooms} onPress={onPress} />
     
        </View>
  </View>
  </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerContainer: {
    width: "100%",
    borderBottomLeftRadius: 60,
    paddingHorizontal:26,
    paddingTop: 7,
  },
 
});

export default SupervisorRoom;
