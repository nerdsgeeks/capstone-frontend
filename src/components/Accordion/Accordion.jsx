import * as React from "react";
import { List } from "react-native-paper";
import RoomAccordionButton from "../RoomAccordionButton/RoomAccordionButton";
import { View, StyleSheet } from "react-native";
import { colors } from "../../../themes/themes";
import Typography from "../Typography/Typography";

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
    <View>
      <List.Section style={[styles.container]}>
        {Object.keys(groupedRooms).map((floor) => (
          <List.Accordion
            theme={{}}
            title={<Typography variant="xs-medium">Floor {floor}</Typography>}
            key={floor}
            style={expanded ? styles.expandedAccordion : defaultAccordion}
            titleStyle={expanded ? styles.expandedTitle : defaultTitle}
          >
            <View style={styles.RoomCard}>
              {groupedRooms[floor].map((room) => (
                <RoomAccordionButton
                  key={room.ID}
                  room={room}
                  onPress={() => onPress(room)}                />
              ))}
            </View>
          </List.Accordion>
        ))}
      </List.Section>
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
  defaultAccordion: {
    alignItems: "space-between",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.n30,
    borderRadius: 12,
    overflow: "scroll",
    height: 34,
  },
  defaultTitle: {
    color: colors.n30,
  },
  expandedAccordion: {
    alignItems: "space-between",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.n50,
    borderRadius: 12,
    overflow: "scroll",
    height: 34,
  },
  expandedTitle: {
    color: colors.n50,
  },
  RoomCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    gap: 10,
    marginTop: 20,
    marginBottom: 6,
  },
});
