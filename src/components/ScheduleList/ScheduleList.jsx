import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";
import { View, FlatList } from "react-native";

const ScheduleList = ({ data }) => {
  const Item = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.n40,
        paddingVertical: 16,
        marginHorizontal: 36,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          columnGap: 20,
        }}
      >
        {/* Fix to day of the week name */}
        <Typography variant="small-medium" style={{ width: 40 }}>
          {item.day}
        </Typography>
        <Typography variant="small-medium">{item.date}</Typography>
      </View>
      <Typography variant="xs-medium" style={{ color: colors.n40 }}>
        {item.time}
      </Typography>
    </View>
  );
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ScheduleList;
