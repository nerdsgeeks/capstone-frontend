import React, { useState } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
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

const HousekeeperProfile = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showScheduleTab, setShowScheduleTab] = useState(true);
  const tabs = [{ label: "Schedule" }, { label: "Perfomance" }];
  const scheduleList = [
    { day: "Tue", date: "Feb 20", time: "10am-6pm" },
    { day: "Wed", date: "Feb 21", time: "10am-6pm" },
    { day: "Fri", date: "Feb 23", time: "8am-4pm" },
    { day: "Sun", date: "Feb 25", time: "1pm-6pm" },
    { day: "Mon", date: "Feb 26", time: "8am-4pm" },
  ];

  const handleTabPress = (index) => {
    setActiveTab(index);

    if (index === 0) {
      setShowScheduleTab(true);
    } else {
      setShowScheduleTab(false);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <LinearGradient
              colors={["#F89C7B", "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 1.0 }}
              locations={[0.01, 0.7, 0.92, 1.0]}
              style={styles.headerGradient}
            >
              <View style={styles.scheduleContainer}>
                <CalendarIcon></CalendarIcon>
                <Typography variant="body-medium">Feb 20 - Feb 27</Typography>
              </View>
              <View style={styles.profilePicAndNameContainer}>
                <Image
                  source={{
                    uri: "https://picsum.photos/2000/600?random=11",
                  }}
                  style={styles.profilePic}
                />
                <View style={styles.nameContainer}>
                  <Typography variant="title-black">Molly Chen</Typography>
                  <Typography variant="body-medium">
                    Housekeeper, Senior
                  </Typography>
                </View>
              </View>
            </LinearGradient>
          </View>
          <View style={styles.mainContainer}>
            <NavTabs
              screen="HousekeeperProfile"
              tabs={tabs}
              activeTab={activeTab}
              onTabPress={handleTabPress}
            />

            {showScheduleTab ? (
              <ScheduleList data={scheduleList} />
            ) : (
              <View style={styles.perfomanceContainer}>
                <View style={styles.perfomanceTopButtonsContainer}>
                  <BigButton
                    name="Total Rooms"
                    icon={<BedIcon w="40" h="28" fill={colors.orange} />}
                    text="30"
                  />
                  <BigButton
                    name="Average Time"
                    icon={<ClockIcon w="40" h="28" fill={colors.orange} />}
                    text="28 mins 16 sec"
                    variant="xs-regular"
                  />
                </View>
                <View style={styles.perfomanceBottomButtonsContainer}>
                  <BigButton
                    name="Rating & Feedbacks"
                    icon={<StarIcon w="40" h="28" fill={colors.teal} />}
                    text="12"
                    width={300}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "column",
  },
  headerContainer: { height: 140 },
  headerGradient: {
    width: "100%",
    height: "100%",
    paddingVertical: 20,
    paddingHorizontal: 32,
    rowGap: 20,
  },
  scheduleContainer: { flexDirection: "row", columnGap: 10 },
  profilePicAndNameContainer: { flexDirection: "row" },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    top: 20,
    borderWidth: 6,
    borderColor: "#FAAB85",
  },
  nameContainer: { flexDirection: "column", rowGap: 10, top: 6 },
  mainContainer: {
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 32,
    // borderWidth: 1,
    marginTop: 60,
    height: 400,
  },
  perfomanceContainer: { rowGap: 60 },
  perfomanceTopButtonsContainer: {
    flexDirection: "row",
    columnGap: 10,
  },
  perfomanceBottomButtonsContainer: {},
});

export default HousekeeperProfile;
