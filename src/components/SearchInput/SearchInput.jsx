import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Typography from "../Typography/Typography";
import SearchIcon from "../../SVG/SearchIcon";

const SearchInput = ({}) => {
  return (
    <View style={styles.searchBoxContainer}>
      <Typography variant="xs-regular">Search</Typography>
      <View>
        <View
          style={{
            position: "absolute",
            top: 18,
            left: 10,
          }}
        >
          <SearchIcon />
        </View>

        <TextInput
          multiline
          style={[styles.requestItemSearchInput]}
          placeholder="Search"
          // onFocus={() => setIsRequestHelpModalTextFocused(true)}
          // onBlur={() => setIsRequestHelpModalTextFocused(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    width: 260,
  },
  requestHelpModalNoteLabel: {
    fontSize: 14,
  },
  requestItemSearchInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    marginTop: 5,
    padding: 10,
    paddingLeft: 36,
    height: 40,
  },
});

export default SearchInput;
