import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../themes/themes";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import NavTabs from "../../components/NavTabs/NavTabs";
import RequestItemContainer from "./RequestItemContainer.jsx";
import RequestHelpContainer from "./RequestHelpContainer";
import HistoryIcon from "../../SVG/HistoryIcon";
import RequestModalSupervisor from "../../components/RequestModalSupervisor/RequestModalSupervisor";
import RequestHelpModal from "../../components/RequestModalSupervisor/RequestHelpModal";

const SupervisorRequest = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isItemDetailModalOpen, setIsItemDetailModalOpen] = useState(false);
  const [selectedItemDetail, setSelectedItemDetail] = useState(null);
  const [isHelpDetailModalOpen, setIsHelpDetailModalOpen] = useState(false);
  const [selectedHelpDetail, setSelectedHelpDetail] = useState(null);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  const pressedIcon = () => {
    console.log("Pressed Icon");
    navigation.navigate("SupervisorRequestHistory");
  };

  const openItemDetailModal = (item) => {
    setSelectedItemDetail(item);
    setIsItemDetailModalOpen(true);
  };

  const openHelpDetailModal = (request) => {
    console.log(request)
    setSelectedHelpDetail(request);
    setIsHelpDetailModalOpen(true);
  };

  // Function to close the modals
  const closeItemDetailModal = () => {
    setIsItemDetailModalOpen(false);
  };

  const closeHelpDetailModal = () => {
    setIsHelpDetailModalOpen(false);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.main, "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          locations={[0.01, 0.7, 0.92, 1.0]}
          style={styles.headerContainer}
        >
          <SafeAreaView>
            <SupervisorRoomHeader
              title="Pending Requests"
              icon={<HistoryIcon />}
              iconOnPress={pressedIcon}
            />
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.tabContainer}>
          <>
            <NavTabs
              tabs={[{ label: "Supplies" }, { label: "Help" }]}
              activeTab={activeTab}
              onTabPress={handleTabPress}
              justifyContent="space-around"
            />

            <View style={styles.bodyContent}>
              {activeTab === 0 ? (
                <RequestItemContainer
                  openItemDetailModal={openItemDetailModal}
                />
              ) : (
                <RequestHelpContainer
                  openHelpDetailModal={openHelpDetailModal}
                />
              )}
            </View>
          </>
        </View>
      </View>
      {isItemDetailModalOpen && selectedItemDetail && (
        <RequestModalSupervisor
          isRequestDetailModalOpen={isItemDetailModalOpen}
          toggleRequestDetailModal={closeItemDetailModal}
          requestDetailObject={selectedItemDetail}
          closeModal={closeItemDetailModal}
        />
      )}
      {isHelpDetailModalOpen && selectedHelpDetail && (
        <RequestHelpModal
          isHelpDetailModalOpen={isHelpDetailModalOpen}
          toggleHelpDetailModal={closeHelpDetailModal}
          helpRequestDetails={selectedHelpDetail}
          closeModal={closeHelpDetailModal}
        />
      )}
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
    borderBottomLeftRadius: 60,
    paddingHorizontal: 26,
    paddingTop: 7,
  },
  tabContainer: {
    flex: 1,
    width: "80%",
    marginTop: 10,
    marginHorizontal: 26,
  },
  bodyContent: {
    paddingTop: 20,
  },
});

export default SupervisorRequest;
