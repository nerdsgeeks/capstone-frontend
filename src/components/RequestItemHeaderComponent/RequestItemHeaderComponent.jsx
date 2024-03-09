import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../Typography/Typography';
import PlayIcon from '../../SVG/PlayIcon';
const RequestItemHeaderComponent = () => {
  return (
    <View style={styles.bodyTableHeader}>
      <PlayIcon />
      <Typography variant="xs-black" style={styles.itemStyle}>Item</Typography>
      <Typography variant="xs-black">Qty</Typography>
      <Typography variant="xs-black">Room</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyTableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    width: "100%",
  },
  itemStyle: {
    marginLeft: 5,
  },
});

export default RequestItemHeaderComponent;
