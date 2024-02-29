import { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { colors } from "../../../themes/themes";

const InputField = ({ label, icon }) => {
  const [text, setText] = useState("");
  return (
    <TextInput
      label={label}
      value={text}
      onChangeText={(text) => setText(text)}
      left={icon ? <TextInput.Icon icon={() => icon} /> : null}
      style={styles.textInput}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 40,
    backgroundColor: colors.n10,
    fontSize: 12,
    fontFamily: "SatoshiMedium",
  },
});

// https://callstack.github.io/react-native-paper/4.0/text-input.html#right
