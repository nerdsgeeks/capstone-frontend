import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";
import { View, FlatList } from "react-native";

const CartList = ({ data }) => {
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
      <Typography variant="small-medium">{item.title}</Typography>
      <Typography variant="small-regular" style={{ color: colors.n40 }}>
        {item.date}
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

export default CartList;
