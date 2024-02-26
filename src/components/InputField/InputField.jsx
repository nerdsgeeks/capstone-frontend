import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const InputField = ({ icon, text }) => {
  const [showIcon, setShowIcon] = useState(true);

  return (
    <View style={styles.container}>
      {showIcon && {icon} }
      <TextInput
        style={styles.input}
        onFocus={() => setShowIcon(false)}
        onBlur={() => setShowIcon(true)}
        value={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
    color: "#555",
  },
});

export default InputField;
