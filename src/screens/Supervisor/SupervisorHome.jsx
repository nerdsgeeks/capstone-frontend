import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import BigButton from "../../components/BigButton/BigButton";
import BedIcon from "../../SVG/BedIcon";
import { colors } from "../../../themes/themes";
import PersonIcon from "../../SVG/PersonIcon";
import RequestIcon from "../../SVG/RequestIcon";

const SupervisorHome = () => {
  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fcbbc",
    alignItems: "center",
    justifyContent: "center",
    
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
  }

});

export default SupervisorHome;
