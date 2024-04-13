import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Typography from "../Typography/Typography";

const NavTabs = ({ tabs, activeTab, onTabPress, justifyContent }) => {
  return (
    <View
      style={[styles.container, { justifyContent: justifyContent || "flex-start", }]}
    >
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            activeTab === index ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => onTabPress(index)}
          disabled={activeTab === index}
        >
          <Typography variant={activeTab === index ? "title-black" : "title-regular"}>{tab.label}</Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap:12,
  },
  tab: {
    alignItems: "center",
    paddingVertical: 1,
    paddingHorizontal: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    paddingHorizontal: 3,
    borderBottomWidth: 3,
    borderBottomColor: "black",
  },
  inactiveTab: {
    opacity: 0.5,
  },
});

export default NavTabs;

// TO use this componet use the below reference code
// declare activetab to tract active tab const [activeTab, setActiveTab] = useState(0);
//  then decalre the tabas as followin with labels
// const tabs = [
//     { label: 'Tab 1' },
//     { label: 'Tab 2' },
//     { label: 'Tab 3' },
//   ];

//   then write a tab change code
// const handleTabPress = (index) => {
//     setActiveTab(index);
//   };

// then declare component as follows
// { <NavTabs tabs={tabs} activeTab={activeTab} onTabPress={handleTabPress} />
// <View>
//   {tabs[activeTab] && (
//     <Text>This is content for {tabs[activeTab].label}</Text>
//   )}
// </View> }
