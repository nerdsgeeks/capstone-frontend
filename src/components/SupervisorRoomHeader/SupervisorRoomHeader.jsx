import { Text, View } from "react-native";
import CalendarIcon from "../../SVG/CalendarIcon";
import Typography from "../Typography/Typography";

const SupervisorRoomHeader = ({ room }) => {
  const date = new Date();
  const day = date.getDate();
  const showDate =
    date.toLocaleString("default", { day: "numeric" }) +
    " " +
    date.toLocaleString("default", { month: "short" });

  return (
    <View style={styles.container}>
      <Typography variant="h5-black"> {room} </Typography>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <CalendarIcon />
        <Typography variant="xs-medium">{showDate} </Typography>
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
