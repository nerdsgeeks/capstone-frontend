import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import { LinearGradient } from "expo-linear-gradient";
import SupervisorRoomMain from "./SupervisorRoomMain";


const SupervisorRoom = ({navigation}) => {
  const rooms = [
    {
        "ID": 1,
        "RoomName": "A101",
        "RoomTypeID": 5,
        "Floor": 1,
        "RoomStatus": "dueOut",
        "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
    },
    {
        "ID": 2,
        "RoomName": "A102",
        "RoomTypeID": 6,
        "Floor": 1,
        "RoomStatus": "dueIn",
        "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
    },
    {
        "ID": 3,
        "RoomName": "A103",
        "RoomTypeID": 6,
        "Floor": 1,
        "RoomStatus": "dueOutdueIn",
        "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
    },
    {
        "ID": 4,
        "RoomName": "A201",
        "RoomTypeID": 2,
        "Floor": 2,
        "RoomStatus": "checkedOut",
        "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
    },
    {
        "ID": 5,
        "RoomName": "A202",
        "RoomTypeID": 2,
        "Floor": 2,
        "RoomStatus": "checkedOutcheckedIn",
        "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
    },
    {
        "ID": 6,
        "RoomName": "A203",
        "RoomTypeID": 6,
        "Floor": 2,
        "RoomStatus": "dueOut",
        "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
    },
    {
        "ID": 7,
        "RoomName": "A301",
        "RoomTypeID": 3,
        "Floor": 3,
        "RoomStatus": "dueIn",
        "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
    },
    {
        "ID": 8,
        "RoomName": "A302",
        "RoomTypeID": 5,
        "Floor": 3,
        "RoomStatus": "checkedIn",
        "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
    },
    {
        "ID": 10,
        "RoomName": "A401",
        "RoomTypeID": 1,
        "Floor": 7,
        "RoomStatus": "dueOut",
        "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
    },
    {
        "ID": 11,
        "RoomName": "B101",
        "RoomTypeID": 4,
        "Floor": 5,
        "RoomStatus": "checkedOut",
        "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
    },
    {
        "ID": 12,
        "RoomName": "B102",
        "RoomTypeID": 3,
        "Floor": 6,
        "RoomStatus": "checkedOutcheckedIn",
        "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
    },
    {
      "ID": 13,
      "RoomName": "B101",
      "RoomTypeID": 4,
      "Floor": 8,
      "RoomStatus": "checkedOut",
      "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
  },
  {
    "ID": 14,
    "RoomName": "B101",
    "RoomTypeID": 4,
    "Floor": 9,
    "RoomStatus": "checkedOut",
    "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
},
{
  "ID": 15,
  "RoomName": "B101",
  "RoomTypeID": 4,
  "Floor": 10,
  "RoomStatus": "checkedOut",
  "RoomImageUrl": "https://picsum.photos/2000/600?random=12"
},
];

  const onPress = (room) => {
    navigation.navigate("SupervisorRoomDetail", { room });
  }

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
        <SafeAreaView style={{ flex: 1 }}>
          <SupervisorRoomHeader room="A123" />
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
    height: "18%",
    borderBottomLeftRadius: 60,
    padding:20
  },
 
});

export default SupervisorRoom;
