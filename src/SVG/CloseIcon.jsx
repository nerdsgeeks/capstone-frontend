import { StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const CloseIcon = ({ onPress, width = "24", height = "24" }) => (
  <TouchableOpacity onPress={onPress} style={styles.closeIcon}>
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 6L18 18"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 18L18 6"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  closeIcon: {
    alignSelf: "flex-end",
    // marginBottom: 20,
  },
});

export default CloseIcon;
