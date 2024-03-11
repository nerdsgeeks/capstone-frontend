import * as React from "react";
import { List } from "react-native-paper";
import RoomAccordionButton from "../RoomAccordionButton/RoomAccordionButton";
import { View, StyleSheet } from "react-native";
import { colors } from "../../../themes/themes";

const Accordion = ({ rooms, onPress }) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const groupedRooms = rooms.reduce((acc, room) => {
    const { Floor } = room;
    if (!acc[Floor]) {
      acc[Floor] = [];
    }
    acc[Floor].push(room);
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
            overflow: "scroll",
          }}
        >
          <View style={styles.RoomCard} >
          {groupedRooms[floor].map((room) => (
            <RoomAccordionButton key={room.ID} room={room} onPress={onPress} />
          ))}
          </View>
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
  RoomCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-start",
  },
});
