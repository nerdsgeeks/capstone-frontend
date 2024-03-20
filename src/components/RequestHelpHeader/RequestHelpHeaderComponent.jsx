import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../Typography/Typography';
import FilterIcon from "../../SVG/FilterIcon";
import { colors } from '../../../themes/themes';

const RequestHelpHeaderComponent = () => {
  return (
    <View style={styles.bodyTableHeader}>
      <FilterIcon />
      <Typography variant="xs-black" style={styles.itemStyle}>Request</Typography>
      <Typography variant="xs-black">Room</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyTableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    paddingBottom: 7,
    borderColor: colors.n50,
    borderBottomWidth: 1,
  },
  itemStyle: {
    marginLeft: 5,
  },
});

export default RequestHelpHeaderComponent;
