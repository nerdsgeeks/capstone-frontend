import { TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import BackIcon from "../../SVG/BackIcon";
import StarIcon from "../../SVG/StarIcon";
import { colors } from "../../../themes/themes";

const PerformanceHeader = ({ onPress, firstName, rating }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 12}}>
        <TouchableOpacity onPress={onPress}>
        <BackIcon />
        </TouchableOpacity>
        <View>
          <Typography variant="small-black">Performance</Typography>
          <Typography variant="small-regular">
            Great work {firstName}
          </Typography>
        </View>
      </View>
      <View style={{ width: 55, height:55, borderRadius: 100, backgroundColor: colors.main, justifyContent: "center", alignItems: "center", position: "relative"}}>
        <StarIcon w="43" h="43"/>
        <Typography variant="xs-black" style={{ position: "absolute"}}>{rating}</Typography>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
};

export default PerformanceHeader;
