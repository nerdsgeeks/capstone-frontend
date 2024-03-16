import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import TrashIcon from "../../SVG/TrashIcon";
import Counter from "../Counter/Counter";
import Typography from "../Typography/Typography";
import { useRequestCartStore } from "../../store/requestStore";

const RequestItemDetail = ({ countProp = 0, imageSrc, itemName, index }) => {
  const [count, setCount] = useState(countProp);
  const requestedItemsCartStore = useRequestCartStore(
    (state) => state.requestedItemsCartStore,
  );
  const updateRequestedItemsCartStore = useRequestCartStore(
    (state) => state.updateRequestedItemsCartStore,
  );
  const handleIncrement = (index) => {
    console.log(index);
    console.log("handleIncrement");
    console.log(requestedItemsCartStore);
    setCount(count + 1);
    const updatedItems = requestedItemsCartStore.map((item, idx) => {
      if (idx === index) {
        return { ...item, count: count + 1 };
      }
      return item;
    });
    updateRequestedItemsCartStore(updatedItems);
  };
  const handleDecrement = (index) => {
    console.log(index);
    console.log("handleDecrement");
    console.log(requestedItemsCartStore);
    setCount(count - 1);
    const updatedItems = requestedItemsCartStore.map((item, idx) => {
      if (idx === index) {
        return { ...item, count: count - 1 };
      }
      return item;
    });
    updateRequestedItemsCartStore(updatedItems);
  };

  return (
    //react native code
    <View style={styles.container}>
      <View>
        <ImageDisplay type="small" source={imageSrc} />
      </View>
      <View>
        <View style={styles.topHeader}>
          <Typography variant="small-medium">{itemName}</Typography>
          {/* <Typography variant="small-medium">{index}</Typography> */}
          <TrashIcon />
        </View>
        <View>
          <Counter
            count={count}
            handleIncrement={() => handleIncrement(index)}
            handleDecrement={() => handleDecrement(index)}
            containerStyle={styles.Counter}
          />
        </View>
      </View>
    </View>
  );
};

export default RequestItemDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 68,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
    paddingVertical: 20,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Counter: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

// to use this component use the below reference code
//      <RequestItemDetail imageSrc={require("imageUrl")} />
