import { View, TouchableOpacity } from "react-native";
import Typography from "../Typography/Typography";

const SupervisorRoomHeader = ({ title, icon, text, iconOnPress }) => {
  const date = new Date();
  const showDate =
    date.toLocaleString("default", { day: "numeric" }) +
    " " +
    date.toLocaleString("default", { month: "short" });

  return (
    <View style={styles.container}>
      <Typography variant="screenHeader-medium"> {title} </Typography>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {iconOnPress ? (
          <TouchableOpacity onPress={iconOnPress}>{icon}</TouchableOpacity>
        ) : (
          icon
        )}
        {text ? <Typography variant="body-medium">{text}</Typography> : null}
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

export default SupervisorRoomHeader;
