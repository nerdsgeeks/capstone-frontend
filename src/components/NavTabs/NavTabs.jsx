import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const NavTabs = ({ tabs, activeTab, onTabPress, screen = "home" }) => {
  return (
    <View
      style={[styles.container, { width: screen === "home" ? 200 : "100%" }]}
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
          <Text style={styles.tabText}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap:20,
    padding: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  inactiveTab: {
    opacity: 0.5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
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
