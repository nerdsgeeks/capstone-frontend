import * as React from "react";
import { List } from "react-native-paper";
import RoomAccordionButton from "../RoomAccordionButton/RoomAccordionButton";
import { View, StyleSheet } from "react-native";
import { colors } from "../../../themes/themes";

const Accordion = ({ rooms }) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const groupedRooms = rooms.reduce((acc, room) => {
    const { roomFloor } = room;
    if (!acc[roomFloor]) {
      acc[roomFloor] = [];
    }
    acc[roomFloor].push(room);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {Object.keys(groupedRooms).map((floor) => (
        <List.Accordion
          title={`Floor ${floor}`}
          key={floor}
          style={{
            backgroundColor: colors.n0,
            borderColor: colors.n50,
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 7.5,
            overflow: "hidden",
          }}
        >
          {groupedRooms[floor].map((room) => (
            <RoomAccordionButton key={room.roomId} room={room} />
          ))}
        </List.Accordion>
      ))}
    </View>
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
});
