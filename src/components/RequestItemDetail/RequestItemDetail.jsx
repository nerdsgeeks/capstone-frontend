import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import TrashIcon from "../../SVG/TrashIcon";
import Counter from "../Counter/Counter";
import Typography from "../Typography/Typography";
import { useRequestCartStore } from "../../store/requestStore";
import { colors } from "../../../themes/themes";

const RequestItemDetail = ({
  countProp = 0,
  imageSrc,
  itemName,
  index,
  disabled = false,
}) => {
  const [count, setCount] = useState(countProp);
  const requestedItemsCartStore = useRequestCartStore(
    (state) => state.requestedItemsCartStore,
  );
  const updateRequestedItemsCartStore = useRequestCartStore(
    (state) => state.updateRequestedItemsCartStore,
  );
  const handleIncrement = (index) => {
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
      <ImageDisplay type="small" source={imageSrc} />

      <View style={{ gap: 23, flexGrow: 1 }}>
        <View style={styles.topHeader}>
          <Typography variant="body-medium">{itemName}</Typography>
          {/* <Typography variant="small-medium">{index}</Typography> */}
          <TrashIcon w="26" h="26" />
        </View>

        <Counter
          count={count}
          handleIncrement={() => handleIncrement(index)}
          handleDecrement={() => handleDecrement(index)}
          containerStyle={styles.Counter}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

export default RequestItemDetail;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",

    justifyContent: "center",
    borderColor: colors.n20,
    borderBottomWidth: 1,

    paddingVertical: 6,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  Counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
