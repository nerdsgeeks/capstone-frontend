import { View, StyleSheet, Text, ScrollView } from "react-native";
import Typography from "../Typography/Typography";
import RequestItemDetail from "../RequestItemDetail/RequestItemDetail";

const RequestedItemsList = ({ items, showRequestedItemText = true }) => {
  return (
    <View style={styles.requestedItemsListContainer}>
      {items.length > 0 && (
        <ScrollView style={styles.container}>
          {showRequestedItemText && (
            <Typography variant="small-medium" style={{ marginLeft: 28 }}>
              Requested Items
            </Typography>
          )}
          {items.map((item, index) => (
            <View key={index} style={{}}>
              <RequestItemDetail
                countProp={item.count}
                imageSrc={item.ImageUrl}
                itemName={item.ItemName}
                index={index}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    rowGap: 10,
  },
  requestedItemsListContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // borderWidth: 2,
    borderColor: "#D9D9D9",
    paddingVertical: 20,
    height: "82%",
  },
});

export default RequestedItemsList;
