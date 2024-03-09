import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Typography from "../../components/Typography/Typography";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ClockIcon from "../../SVG/ClockIcon";
import NavTabs from "../../components/NavTabs/NavTabs";
import PlayIcon from "../../SVG/PlayIcon";
import RequestItemComponent from "../../components/RequestItemComponent/RequestItemComponent";
import Button from "../../components/Button/Button";
import RequestItemHeaderComponent from "../../components/RequestItemHeaderComponent/RequestItemHeaderComponent";

const SupervisorRequest = () => {
  const tabs = [{ label: "Room Supplies" }, { label: "Cleaner Supplies" }];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  const onPressApprove = () => {
    console.log("Approve");
  };

  const onPressDecline = () => {
    console.log("Decline");
  };

  const room = [
    ["Toilet Paper", 2, 101, "2022-01-01"],
    ["Hand Soap", 1, 102, "2022-01-01"],
    ["Towels", 3, 103, "2022-01-01"],
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Typography variant="h5-black" style={styles.headerStyle}>
              Pending Request
            </Typography>
            <ClockIcon />
          </View>
          <View style={styles.tabContainer}>
            <>
              <NavTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabPress={handleTabPress}
              />
              <View style={styles.bodyContent}>
                {tabs[activeTab] && (
                  <View>
                    <RequestItemHeaderComponent />
                    {room.map((room, index) => (
                      <RequestItemComponent key={index} room={room} />
                    ))}
                  </View>
                )}

                <View style={styles.buttonStyles}>
                  <Button name="Approve" onPress={onPressApprove} type="primary" />
                  <Button name="Decline" onPress={onPressDecline} type="secondary"/>
                </View>
              </View>
            </>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  tabContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  bodyContent: {
    marginTop: 20,
  },
  buttonStyles: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 20,
  }

  // itemStyle: {
  //   flexGrow: 1,
  // },
});

export default SupervisorRequest;
