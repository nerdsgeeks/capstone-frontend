import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import TrashIcon from "../../SVG/TrashIcon";
import Counter from "../Counter/Counter";
import Typography from "../Typography/Typography";

const RequestItemDetail = ({ imageSrc, itemName }) => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
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
          <TrashIcon />
        </View>
        <View>
          <Counter
            count={count}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
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
