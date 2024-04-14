import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Dimensions, View, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import ClockShiftIcon from "../../SVG/ClockShiftIcon";
import CalendarIcon from "../../SVG/CalendarIcon";
import Typography from "../../components/Typography/Typography";
import NavTabs from "../../components/NavTabs/NavTabs";
import ScheduleList from "../../components/ScheduleList/ScheduleList";
import BigButton from "../../components/BigButton/BigButton";
import BedIcon from "../../SVG/BedIcon";
import ClockIcon from "../../SVG/ClockIcon";
import { colors } from "../../../themes/themes";
import StarIcon from "../../SVG/StarIcon";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";
import axios from "axios";
import useBaseUrl from "../../hooks/useBaseUrl";
import LoadingScreen from "../LoadingScreen";

const HousekeeperProfile = ({ navigation }) => {
  const baseUrl = useBaseUrl();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [showScheduleTab, setShowScheduleTab] = useState(false);
  const tabs = [{ label: "Perfomance" }, { label: "Schedule" }];
  const scheduleList = [
    { day: "Tue", date: "Apr 15", time: "10am-6pm" },
    { day: "Wed", date: "Apr 16", time: "10am-6pm" },
    { day: "Thu", date: "Apr 17", time: "8am-4pm" },
    { day: "Fri", date: "Apr 18", time: "1pm-6pm" },
    { day: "Sat", date: "Apr 20", time: "8am-4pm" },
  ];

  const [rooms, setRooms] = useState([]);

  const windowWidth = Dimensions.get("window").width;
  const accessTokenStore = useAccessTokenStore(
    (state) => state.accessTokenStore,
  );
  const updateAccessTokenStore = useAccessTokenStore(
    (state) => state.updateAccessTokenStore,
  );

  const employeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.employeeDetailsStore,
  );
  const updateEmployeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.updateEmployeeDetailsStore,
  );

  useEffect(() => {
    const apiUrl = baseUrl + "/api/assignedRooms/assignedRoomTblAll";
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    const onFetchAssignedRooms = () =>
      axios
        .get(apiUrl, config)
        .then((response) => {
          const data = response.data;
          const filteredData = data.filter(
            (assignedRoom) =>
              assignedRoom.assignedEmployeeID === employeeDetailsStore.userId &&
              assignedRoom.cleaningStatus === "Approved",
          );
          setRooms(filteredData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching assigned rooms:", error);
        });
    onFetchAssignedRooms();
  }, []);

  // const filteredRooms = rooms.filter((room) => {
  //   return (
  //     room.assignedEmployeeID === employeeDetailsStore.userId &&
  //     room.cleaningStatus === "Approved"
  //   );
  // });

  // console.log("roooOooOOMS: ", filteredRooms)

  const totalMilliseconds = rooms.reduce((acc, room) => {
    const durationMilliseconds =
      new Date(room.cleaningDuration).getTime() -
      new Date("1970-01-01").getTime();
    return acc + durationMilliseconds;
  }, 0);

  const averageMilliseconds = totalMilliseconds / rooms.length;

  const averageMinutes = Math.floor(averageMilliseconds / (1000 * 60));
  const averageSeconds = Math.floor((averageMilliseconds / 1000) % 60);

  const averageDuration = `${averageMinutes.toString().padStart(2, "0")}:${averageSeconds.toString().padStart(2, "0")}`;

  // Filter out rooms with a rating of 0
  const ratedRooms = rooms.filter((room) => room.rating !== 0);

  // Calculate the total rating for the filtered rooms
  const totalRating = ratedRooms.reduce((acc, room) => {
    return acc + room.rating;
  }, 0);

  // Calculate the average rating based on the filtered rooms
  const averageRating =
    ratedRooms.length > 0
      ? parseFloat((totalRating / ratedRooms.length).toFixed(2))
      : 0;

  const renderStars = () => {
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < Math.ceil(averageRating); i++) {
      stars.push(<StarIcon w="25" h="25" key={i} fill={colors.teal} />);
    }

    for (let i = Math.ceil(averageRating); i < totalStars; i++) {
      stars.push(<StarIcon w="25" h="25" key={i} fill={colors.n30} />);
    }

    return stars;
  };

  const handleTabPress = (index) => {
    setActiveTab(index);

    if (index === 1) {
      setShowScheduleTab(true);
    } else {
      setShowScheduleTab(false);
    }
  };

  const onPressRatingAndFeedback = () => {
    navigation.navigate("HousekeeperPerformance", {});
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={["#F89C7B", "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          locations={[0.01, 0.7, 0.92, 1.0]}
          style={styles.headerGradient}
        >
          <SafeAreaView>
            <View style={{ gap: 16 }}>
              <View style={styles.scheduleContainer}>
                <CalendarIcon></CalendarIcon>
                <Typography variant="body-medium">Apr 14 - Apr 20</Typography>
              </View>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{
                    uri: `${employeeDetailsStore.imageURL}`,
                  }}
                  style={styles.profilePic}
                />
                <View style={styles.nameContainer}>
                  <Typography variant="h4-black">
                    {employeeDetailsStore.firstName}{" "}
                    {employeeDetailsStore.lastName}
                  </Typography>
                  <Typography variant="body-medium">Housekeeper</Typography>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <View style={{ flexDirection: "row", marginVertical: 26 }}>
          <View style={styles.mainContainer}>
            <NavTabs
              screen="HousekeeperProfile"
              tabs={tabs}
              activeTab={activeTab}
              onTabPress={handleTabPress}
              justifyContent="space-around"
            />
            <View style={{ paddingVertical: 16 }}>
              {showScheduleTab ? (
                <ScheduleList data={scheduleList} />
              ) : (
                <View style={styles.perfomanceContainer}>
                  <View style={styles.perfomanceTopButtonsContainer}>
                    <BigButton
                      name="Total Rooms"
                      icon={<BedIcon w="48" h="33" fill={colors.main} />}
                      text={rooms.length}
                      width={windowWidth / 2 - 34}
                      disabled
                    />
                    <BigButton
                      name="Average Time"
                      icon={<ClockIcon w="33" h="33" fill={colors.main} />}
                      text={averageDuration}
                      variant="xs-medium"
                      width={windowWidth / 2 - 34}
                      disabled
                    />
                  </View>
                  <View style={styles.perfomanceBottomButtonsContainer}>
                    <BigButton
                      name="Rating & Feedbacks"
                      icon={renderStars()}
                      text={averageRating}
                      width="100%"
                      onPress={onPressRatingAndFeedback}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
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
    backgroundColor: "white",
  },
  headerGradient: {
    width: "100%",
    paddingHorizontal: 26,
    paddingTop: 8,
  },
  scheduleContainer: {
    flexDirection: "row",
    columnGap: 10,
    alignSelf: "flex-start",
  },
  // profilePicAndNameContainer: {

  //   alignItems: "flex-start",

  // },
  profilePic: {
    width: 140,
    height: 140,
    // positin: "absolute",
    borderRadius: 150,
  },
  mainContainer: {
    flexDirection: "column",
    flexGrow: 1,
  },
  perfomanceContainer: {
    gap: 8,
    marginHorizontal: 26,
    marginVertical: 16,
  },
  perfomanceTopButtonsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  perfomanceBottomButtonsContainer: {},
  nameContainer: {
    paddingTop: 16,
    paddingBottom: 30,
    alignItems: "center",
  },
});

export default HousekeeperProfile;
