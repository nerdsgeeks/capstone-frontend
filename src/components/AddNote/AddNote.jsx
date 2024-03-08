import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import PlusIcon from "../../SVG/PlusIcon";
import Typography from "../Typography/Typography";
import CheckIcon from "../../SVG/CheckIcon";

const AddNote = () => {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [textInputIsShown, setTextInputIsShown] = useState(false);

  const onPress = () => {
    setTextInputIsShown(true);
  };

  const onChangeText = (text) => {
    setNote(text);
  };

  const onSubmit = () => {
    setTextInputIsShown(false);
    setSavedNote(note);
  };
  const editText = () => {
    setTextInputIsShown(true);
  };

  return (
    <View style={styles.container}>
      {!savedNote && (
        <View style={styles.iconAndText}>
          {textInputIsShown ? (
            <CheckIcon onPress={onSubmit} />
          ) : (
            <PlusIcon onPress={onPress} />
          )}
          {!savedNote && (
            <Typography variant="body-medium" style={{}}>
              Note
            </Typography>
          )}
        </View>
      )}
      {textInputIsShown && !savedNote && (
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          value={note}
          onSubmitEditing={onSubmit}
          placeholder="Enter your note"
        />
      )}
      <TouchableOpacity onPress={editText}>
        {savedNote && <Typography variant="h5-black">{savedNote}</Typography>}
      </TouchableOpacity>
      {textInputIsShown && savedNote && (
        <View style={styles.editText}>
          <CheckIcon onPress={onSubmit} />
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeText}
            value={note}
            onSubmitEditing={onSubmit}
            placeholder="Enter your note"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  iconAndText: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
  },
  editText: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export default AddNote;
