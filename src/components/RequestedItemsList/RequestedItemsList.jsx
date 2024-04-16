import { View, StyleSheet, Text, ScrollView } from "react-native";
import Typography from "../Typography/Typography";
import RequestItemDetail from "../RequestItemDetail/RequestItemDetail";

const RequestedItemsList = ({
  items,
  showRequestedItemText = true,
  disabled = false,
}) => {
  return (
    <View style={styles.requestedItemsListContainer}>
      {items.length > 0 && (
        <ScrollView style={styles.container}>
          {showRequestedItemText && (
            <Typography variant="title-medium" style={{ marginTop: 20 }}>
              Requested Items
            </Typography>
          )}
          {items.map((item, index) => (
            <View key={index}>
              <RequestItemDetail
                countProp={item.count}
                imageSrc={item.ImageUrl}
                itemName={item.ItemName}
                index={index}
                disabled={disabled}
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
    backgroundColor: "white",
    // rowGap: 10,
  },
  requestedItemsListContainer: {
    flex: 1,
  },
});

export default RequestedItemsList;
