import { Text, View } from "react-native";
import CalendarIcon from "../../SVG/CalendarIcon";
import Typography from "../Typography/Typography";

const SupervisorRoomHeader = ({ room }) => {
    
    const date = new Date();
const day = date.getDate();
const showDate = date.toLocaleString('default', { day: 'numeric' }) + ' ' + date.toLocaleString('default', { month: 'short' });

    return (
        <View style={styles.Container}>
            <Typography variant="h5-black"> {room} </Typography>
            <Typography variant="xs-medium">
            <CalendarIcon /> {showDate} 
            </Typography>
        </View>
    );
}

const styles = {
    Container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 40,
        paddingRight: 40,
        alignItems: "flex-start",
        borderBottomLeftRadius: 60,
    },
};


export default SupervisorRoomHeader;