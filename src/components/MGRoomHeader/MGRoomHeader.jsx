import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Typography from "../Typography/Typography";
import { colors } from "../../../themes/themes";
import { LinearGradient } from "expo-linear-gradient";
import CalendarIcon from "../../SVG/CalendarIcon";

const MGRoomHeader = ({name,message}) => {
  const today = new Date();
  const shortMonthName = today.toLocaleString("default", { month: "short" });
  const formattedDate = `${today.getDate()} ${shortMonthName} `;

  return (
  
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: "https://picsum.photos/2000/600?random=11",
          }}
          style={styles.profilePic}
        />
        <View style={styles.rightContainer}>
          <View style={styles.innerContainer}>
            <Typography variant="h5-black">HI {name}</Typography>

            <View style={styles.rightInnerContainer}>
              <CalendarIcon />
              <Typography variant="xs-medium">{formattedDate}</Typography>
            </View>
          </View>
          <View style={styles.messageContainer}>
            <Typography variant="xs-medium">
             {message}
            </Typography>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 60,
    backgroundColor: "#F89C7B",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
    height: "15%"
  },
  headerContainer: {
    flexDirection: "row",
  },
  messageContainer: {
    width: "90%",
  },
  rightContainer: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
  },

  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  rightInnerContainer: {
    flexDirection: "row",
    gap:10
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
 
});

export default MGRoomHeader;
