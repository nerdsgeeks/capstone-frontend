import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TestModal from "../../TestModal";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import HomeIcon from "../../SVG/HomeIcon";
import ProfileIcon from "../../SVG/ProfileIcon";
import CartIcon from "../../SVG/CartIcon";
import AssignedRoomListItem from "../../components/AssignedRoom/AssignedRoomListItem";
import HousekeeperHomeHeader from "../../components/HousekeeperHomeHeader/HousekeeperHomeHeader";
import ClockIcon from "../../SVG/ClockIcon";
import ClockShiftIcon from "../../SVG/ClockShiftIcon";
import NavTabs from "../../components/NavTabs/NavTabs";
import RoomDetailInfo from "../../components/RoomDetailInfo/RoomDetailInfo";

const HousekeeperTest = ({ navigation }) => {
  const roomGoldDueout = {
    tier: "gold",
    type: "Suite",
    status: "dueOut",
    roomNumber: "101",
    date: "2023-04-01",
  };
  const roomSilverDueout = {
    tier: "silver",
    type: "King Bed",
    status: "dueOut",
    roomNumber: "101",
    date: "2023-04-01",
  };
  const roomDiamondDueout = {
    tier: "diamond", 
    type: "Queen Bed",
    status: "dueOut",
    roomNumber: "101",
    date: "2023-04-01",
  };

  const roomGoldDueIn = {
    tier: "gold",
    type: "Double Bed",
    status: "dueIn",
    roomNumber: "101",
    date: "2023-04-01",
  };

  const roomGoldCheckedOut = {
    tier: "gold",
    type: "Suite",
    status: "checkedOut",
    roomNumber: "101",
    date: "2023-04-01",
  };

  const roomGoldCheckedIn = {
    tier: "gold",
    type: "King Bed",
    status: "checkedIn",
    roomNumber: "101",
    date: "2023-04-01",
  };

  const roomGoldDueOutdueIn = {
    tier: "gold",
    type: "Queen Bed",
    status: "dueOutdueIn",
    roomNumber: "101",
    date: "2023-04-01",
  };

  const roomGoldCheckedOutcheckedIn = {
    tier: "gold",
    type: "Double Bed",
    status: "checkedOutcheckedIn",
    roomNumber: "101",
    date: "2023-04-01",
  };

  const reservation = {
    id: 12345,
    roomId: "A101",
    checkIn: "2024-03-10",
    checkOut: "2024-03-15",
    guestName: "John Doe",
    noOfGuest: 2,
    additionalNotes: "Prefer a room with a view if available.",
    isCompleted: false
  };
  

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [{ label: "To do" }, { label: "Completed" }];
  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  return (
    <ScrollView style={styles.container}>
      <TestModal />
      <RoomDetailInfo room={roomGoldDueOutdueIn} reservation= {reservation}></RoomDetailInfo>
      <HomeIcon fill="#FECE8C"></HomeIcon>
      <ProfileIcon fill="#FECE8C"></ProfileIcon>
      <CartIcon fill="#FECE8C"></CartIcon>
      <Button name="Primary" type="secondary" onPress={handleClick} />
      <Typography variant="h1-black" style={{ color: "blue" }}>
        Hello World!
      </Typography>
      <HousekeeperHomeHeader
        name="Pujan"
        message="Time to shine at work!"
        taskProgress={0.4}
        scheduleTime="10:00-18:00"
      ></HousekeeperHomeHeader>
      <ClockIcon></ClockIcon>
      <ClockShiftIcon></ClockShiftIcon>

      <NavTabs tabs={tabs} activeTab={activeTab} onTabPress={handleTabPress} />
      <View>
        {tabs[activeTab] && (
          <Text>This is content for {tabs[activeTab].label}</Text>
        )}
      </View>
      <AssignedRoomListItem room={roomGoldDueout} />
      <AssignedRoomListItem room={roomSilverDueout} />
      <AssignedRoomListItem room={roomDiamondDueout} />

      <AssignedRoomListItem room={roomGoldDueIn} />
      <AssignedRoomListItem room={roomGoldCheckedOut} />
      <AssignedRoomListItem room={roomGoldCheckedIn} />
      <AssignedRoomListItem room={roomGoldDueOutdueIn} />
      <AssignedRoomListItem room={roomGoldCheckedOutcheckedIn} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});

export default HousekeeperTest;
