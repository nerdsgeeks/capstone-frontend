import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { colors } from "../../../themes/themes";

const InputField = ({ label, icon }) => {
  const [text, setText] = useState("");
  return (
    <View style={{ flexDirection: "row"}}>
      <TextInput
        label={label}
        value={text}
        onChangeText={(text) => setText(text)}
        left={icon ? <TextInput.Icon icon={() => icon} /> : null}
        style={styles.textInput}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 40,
    backgroundColor: colors.n10,
    fontSize: 12,
    fontFamily: "SatoshiMedium",
    flexGrow: 1,
    color: colors.n50,
  },
});

// https://callstack.github.io/react-native-paper/4.0/text-input.html#right
