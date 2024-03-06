import React from "react";
import { StyleSheet, View } from "react-native";
import MGRoomHeader from "../../components/MGRoomHeader/MGRoomHeader";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BigButton from "../../components/BigButton/BigButton";
import BedIcon from "../../SVG/BedIcon";
import { colors } from "../../../themes/themes";
import PersonIcon from "../../SVG/PersonIcon";
import RequestIcon from "../../SVG/RequestIcon";

const SupervisorHome = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={["#F89C7B", "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          locations={[0.01, 0.7, 0.92, 1.0]}
          style={styles.headerGradient}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <MGRoomHeader
              name="thalha"
              message="some quote is here just act as this is a quote"
            />
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.body}>
        </View>
    <View style={styles.bodyContainer}>
      <View style={styles.statusContainer}>
        <View style={styles.upperContainer}>
          <BigButton
            name="To Do"
            icon={<BedIcon w="40" h="28" fill={colors.orange}
            />}
            text="86"
          />
           <BigButton
            name="Completed"
            icon={<BedIcon w="40" h="28" fill={colors.orange} />}
            text="86"
          />
        </View>
         <View style={styles.lowerContainer}>
           <BigButton
            name="Staff Active"
            icon={<PersonIcon w="40" h="28" fill={colors.orange} />}
            text="86"
                   />
           <BigButton
            name="Pending"
            icon={<RequestIcon w="40" h="28" stroke={colors.orange} />}
            text="86"
                   />
         </View>
      </View>
      <BigButton name="Update Room Status" icon={<RequestIcon w="40" h="28" stroke={colors.orange} />}  style={{width:"90%"}}/>
    </View>
    </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fcbbc",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerGradient: {
    width: "100%",
    height: "20%",
    borderBottomLeftRadius: 60,
    padding:20
  },
  statusContainer:{
    display: "flex",
    flexDirection: "column",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  upperContainer:{
    display: "flex",
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerContainer:{
    display: "flex",
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer:{

    display: "flex",
      flexDirection: "column",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
 
});

export default SupervisorHome;
