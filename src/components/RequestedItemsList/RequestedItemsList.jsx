import { View, StyleSheet } from "react-native";
import Typography from "../Typography/Typography";
import RequestItemDetail from "../RequestItemDetail/RequestItemDetail";

const RequestedItemsList = ({ items }) => {
  return (
    <View>
      {items.length > 0 && (
        <View style={styles.container}>
          <Typography variant="small-medium">Requested Items</Typography>
          {items.map((item, index) => (
            <View key={index}>
              <RequestItemDetail
                imageSrc={item.imageSrc}
                itemName={item.itemName}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f2",
    },
  });

export default RequestedItemsList;

