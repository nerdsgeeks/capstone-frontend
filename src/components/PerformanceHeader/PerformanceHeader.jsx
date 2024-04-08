import { TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import BackIcon from "../../SVG/BackIcon";
import StarIcon from "../../SVG/StarIcon";
import { colors } from "../../../themes/themes";

const PerformanceHeader = ({ onPress, firstName, rating }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center"}}>
        <TouchableOpacity onPress={onPress}>
        <BackIcon />
        </TouchableOpacity>
        <View style={{gap: 6}}>
          <Typography variant="h4-regular">Performance</Typography>
          <Typography variant="body-regular">
            Great work {firstName}!
          </Typography>
        </View>
      </View>
      <View style={{ width: 65, height:65, borderRadius: 100, backgroundColor: colors.main, justifyContent: "center", alignItems: "center", position: "relative"}}>
        <StarIcon w="50" h="50"/>
        <Typography variant="title-black" style={{ position: "absolute"}}>{rating}</Typography>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // paddingVertical: 24,
    alignItems: "flex-start",
    // paddingHorizontal: 26,
  },
};

export default PerformanceHeader;
