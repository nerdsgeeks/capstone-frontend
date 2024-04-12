import * as React from "react";
import { List } from "react-native-paper";
import RoomAccordionButton from "../RoomAccordionButton/RoomAccordionButton";
import { ScrollView, View, StyleSheet } from "react-native";
import { colors } from "../../../themes/themes";
import Typography from "../Typography/Typography";

const Accordion = ({ rooms, onPressRoomDetail }) => {
  const [expanded, setExpanded] = React.useState(() => {
    const initialState = {};
  
    rooms.forEach((room) => {
      const { Floor } = room;
      initialState[Floor] = false;
    });
  
    if (rooms.length > 0) {
      initialState[rooms[0].Floor] = true;
    }
  
    return initialState;
  });

  const handlePress = (floor) => {
    setExpanded((prevState) => ({
      ...prevState,
      [floor]: !prevState[floor],
    }));
  };



  const groupedRooms = rooms.reduce((acc, room) => {
    const { Floor } = room;
    if (!acc[Floor]) {
      acc[Floor] = [];
    }
    acc[Floor].unshift(room);
    return acc;
  }, {});

  return (
    <ScrollView style={{ width: "100%" }}>
      <List.Section style={[styles.container]}>
        {Object.keys(groupedRooms).map((floor) => (
          <List.Accordion
            title={<Typography variant="body-medium">Floor {floor}</Typography>}
            key={floor}
            expanded={expanded[floor]}
            onPress={() => handlePress(floor)}
            style={expanded[floor] ? styles.expandedAccordion : styles.defaultAccordion}
            titleStyle={expanded[floor] ? styles.expandedTitle : styles.defaultTitle}
            rippleColor={colors.n1}
          >
            <View style={styles.RoomCard}>
              {groupedRooms[floor].map((room) => (
                <RoomAccordionButton
                  key={room.ID}
                  room={room}
                  onPressRoomDetail={() => onPressRoomDetail(room)} />
              ))}
            </View>
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginHorizontal: 26,
    marginVertical: 16,
    gap: 14,
  },
  defaultAccordion: {
    alignItems: "space-between",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.n30,
    backgroundColor: colors.n0,
    borderRadius: 12,
    overflow: "scroll",
    height: 44,
  },
  defaultTitle: {
    color: colors.n30,
  },
  expandedAccordion: {
    alignItems: "space-between",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.n50,
    backgroundColor: colors.n0,
    borderRadius: 12,
    overflow: "scroll",
    height: 44,
  },
  expandedTitle: {
    color: colors.n50,
  },
  RoomCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    gap: 10,
    marginTop: 10,
    marginBottom: 6,
  },
});
