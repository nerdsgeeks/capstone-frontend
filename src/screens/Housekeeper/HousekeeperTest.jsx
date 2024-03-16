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
import Stopwatch from "../../components/Stopwatch/Stopwatch";
import ScheduleList from "../../components/ScheduleList/ScheduleList";
import RequestedItemsList from "../../components/RequestedItemsList/RequestedItemsList";
import BedIcon from "../../SVG/BedIcon";
import BigButton from "../../components/BigButton/BigButton";
import { colors } from "../../../themes/themes";
import MGRoomHeader from "../../components/MGRoomHeader/MGRoomHeader";
import Accordion from "../../components/Accordion/Accordion";
import RoomAccordionButton from "../../components/RoomAccordionButton/RoomAccordionButton";
import useBaseUrl from "../../hooks/useBaseUrl";

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
    isCompleted: false,
  };

  const data = [
    { day: "Tue", date: "Feb 20", time: "10am-6pm" },
    { day: "Wed", date: "Feb 21", time: "10am-6pm" },
    { day: "Fri", date: "Feb 23", time: "8am-4pm" },
    { day: "Sun", date: "Feb 25", time: "1pm-6pm" },
    { day: "Mon", date: "Feb 26", time: "8am-4pm" },
  ];

  const dummyRooms = [
    {
      id: 1,
      roomName: "A203",
      roomFloor: 2,
      roomTypeId: 1,
      Rooms_RoomStatus: "dueOut",
    },
    {
      id: 2,
      roomName: "B105",
      roomFloor: 1,
      roomTypeId: 2,
      Rooms_RoomStatus: "dueIn",
    },
    {
      id: 3,
      roomName: "C307",
      roomFloor: 3,
      roomTypeId: 3,
      Rooms_RoomStatus: "checkedOut",
    },
    {
      id: 4,
      roomName: "D410",
      roomFloor: 4,
      roomTypeId: 4,
      Rooms_RoomStatus: "checkedIn",
    },
    {
      roomName: "E201",
      roomFloor: 2,
      roomTypeId: 1,
      Rooms_RoomStatus: "dueOutdueIn",
    },
    {
      roomName: "F112",
      roomFloor: 1,
      roomTypeId: 2,
      Rooms_RoomStatus: "checkedOutcheckedIn",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [{ label: "To do" }, { label: "Completed" }];
  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  const room = {
    roomFloor: 2,
    roomName: "A203",
    roomStatus: "dueOut",
    roomTypeId: 1,
  };
  const dummyItems = [
    {
      id: "1",
      imageSrc: "https://picsum.photos/2000/600?random=11",
      itemName: "Item 1",
    },
    {
      id: "2",
      imageSrc: "https://picsum.photos/2000/600?random=12",
      itemName: "Item 2",
    },
    {
      id: "3",
      imageSrc: "https://picsum.photos/2000/600?random=13",
      itemName: "Item 3",
    },
  ];
  const baseUrl = useBaseUrl();

  return (
    <ScrollView style={styles.container}>
      <TestModal />
      <Accordion rooms={dummyRooms} />
      <RoomAccordionButton room={room} />
      <Text>Base URL is: {baseUrl}</Text>
      <MGRoomHeader />
      <BigButton
        name="bark bark"
        icon={<BedIcon w="40" h="28" fill={colors.orange} />}
      />
      <BigButton name="bark bark" text="30" />
      <Typography variant="body-regular">Hello</Typography>
      <ScheduleList data={data} />
      <Stopwatch />
      <RequestedItemsList items={dummyItems}></RequestedItemsList>
      <RoomDetailInfo
        room={roomGoldDueOutdueIn}
        reservation={reservation}
      ></RoomDetailInfo>
      <HomeIcon fill="#FECE8C"></HomeIcon>
      <ProfileIcon fill="#FECE8C"></ProfileIcon>
      <CartIcon fill="#FECE8C"></CartIcon>
      <Button name="Primary" type="secondary" />
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
      {/* <AssignedRoomListItem room={roomGoldDueout} />
      <AssignedRoomListItem room={roomSilverDueout} />
      <AssignedRoomListItem room={roomDiamondDueout} />

      <AssignedRoomListItem room={roomGoldDueIn} />
      <AssignedRoomListItem room={roomGoldCheckedOut} />
      <AssignedRoomListItem room={roomGoldCheckedIn} />
      <AssignedRoomListItem room={roomGoldDueOutdueIn} />
      <AssignedRoomListItem room={roomGoldCheckedOutcheckedIn} /> */}
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
