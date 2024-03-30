import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View, TouchableOpacity, Image, ScrollView } from "react-native";
import Typography from "../../components/Typography/Typography";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "../../SVG/BackIcon";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../themes/themes";
import NavTabs from "../../components/NavTabs/NavTabs";
import RequestItemHistory from "../../components/RequestItemHistory/RequestItemHistory";
import Button from "../../components/Button/Button";
import RequestItemHeaderComponent from "../../components/RequestItemHeaderComponent/RequestItemHeaderComponent";
import CloseIcon from "../../SVG/CloseIcon";
import CalendarIcon from "../../SVG/CalendarIcon";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import axios from "axios";
import useBaseUrl from "../../hooks/useBaseUrl";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";
import RequestHelpHeaderComponent from "../../components/RequestHelpHeader/RequestHelpHeaderComponent";
import { fetchRequestItems, fetchRooms } from "../Utils/SupervisorApi";
import RequestHelpModal from "../../components/RequestModalSupervisor/RequestHelpModal";
import RequestModalSupervisor from "../../components/RequestModalSupervisor/RequestModalSupervisor";

const SupervisorRequestHistory = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [requestDetailObject, setRequestDetailObject] = useState({});
  const [requestItems, setRequestItems] = useState([]);
  const [requestHelp, setRequestHelp] = useState([]);
  const [isItemDetailModalOpen, setIsItemDetailModalOpen] = useState(false);
  const [isHelpDetailModalOpen, setIsHelpDetailModalOpen] = useState(false);
  const [selectedItemDetail, setSelectedItemDetail] = useState(null);
  const [selectedHelpDetail, setSelectedHelpDetail] = useState(null);

  const onPress = ({ request }) => {
    if (activeTab === 0) {
      setSelectedItemDetail(request);
      setIsItemDetailModalOpen(true);
      console.log("here");
    } else {
      setSelectedHelpDetail(request);
      setIsHelpDetailModalOpen(true);
    }
  };

  const closeItemDetailModal = () => {
    setIsItemDetailModalOpen(false);
  };

  const closeHelpDetailModal = () => {
    setIsHelpDetailModalOpen(false);
  };
  const baseUrl = useBaseUrl();
  


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

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  

  useEffect(() => {
    fetchRequestItems(baseUrl, accessTokenStore).then((data) => {
      const filteredData = data.filter((item) => !item.isCompleted);
      setRequestItems(filteredData);
    });
    fetchRooms(baseUrl, accessTokenStore).then((data) => {
      const filteredData = data.filter((room) => room.isHelperRequested);
      setRequestHelp(filteredData);
    });
  }, []);

  const tabs = [{ label: " Supplies" }, { label: "Help" }];

  const goBack = () => {
    navigation.goBack();
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
              title={
                <View
                  style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                >
                  <TouchableOpacity onPress={goBack}>
                    <BackIcon />
                  </TouchableOpacity>
                  <Typography variant="h4-medium">History</Typography>
                </View>
              }
            />
          </SafeAreaView>
        </LinearGradient>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.tabContainer}>
            <NavTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabPress={handleTabPress}
              justifyContent="center"
            />
            <ScrollView>
            <View style={styles.bodyContent}>
              {activeTab === 0 ? (
                <View style={styles.horizontalContainer}>
                  <RequestItemHeaderComponent />
                  {requestItems.map((request, index) => (
                    <RequestItemHistory
                      key={index}
                      request={request}
                      onPress={() => onPress({ request: request })}
                    />
                  ))}
                </View>
              ) : (
                <View style={styles.horizontalContainer}>
                  <RequestHelpHeaderComponent />
                  {requestHelp.map((request, index) => (
                    <RequestItemHistory
                      key={index}
                      request={request}
                      onPress={() => onPress({ request: request })}
                    />
                  ))}
                </View>
              )}
              
            </View>
            </ScrollView> 
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
    paddingHorizontal: 26,
    paddingTop: 7,
  },
  tabContainer: {
    marginTop: 10,
    flexGrow: 1,
    marginHorizontal: 26,
  },
  bodyContent: {
    paddingTop: 20,
    flexGrow: 1,
    // width: "100vw",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
  },
  itemDetailModal: {
    flexGrow: 1,
    margin: 15,
    backgroundColor: colors.n0,
    borderRadius: 20,
    paddingHorizontal: 26,
    paddingVertical: 15,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    gap: 10,
  },
  notes: {
    padding: 10,
    backgroundColor: colors.pale_teal2,
    borderRadius: 8,
  },
});

export default SupervisorRequestHistory;
