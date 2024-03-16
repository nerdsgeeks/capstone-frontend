import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Typography from "../components/Typography/Typography";
import Button from "../components/Button/Button";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../themes/themes";

const LoginScreen = ({}) => {
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    // Here you can implement your login logic
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={require("../../assets/login.png")}
          />
        </View>
      </ImageBackground>
      <View>
        <RadioButtonGroup
          containerStyle={{
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "center",
            gap: 30,
          }}
          selected={type}
          onSelected={(value) => setType(value)}
          radioBackground={colors.teal}
        >
          <RadioButtonItem
            value="1"
            label={<Typography variant="xs-regular">Manager</Typography>}
          />
          <RadioButtonItem
            value="2"
            label={<Typography variant="xs-regular">Staff</Typography>}
          />
        </RadioButtonGroup>
      </View>
      <View style={styles.logInContainer}>
        <View style={styles.credentialsContainer}>
          <Typography variant="xs-regular">Employee ID</Typography>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
            />
          </View>
        </View>
        <View style={styles.credentialsContainer}>
          <Typography variant="xs-regular">Password</Typography>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={togglePasswordVisibility}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Button name="Login" type="primary" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 55,
    gap: 16,
  },
  background: {
    width: "100%",
    alignItems: "center",
    justifySelf: "flex-end",
  },
  image: {
    marginVertical: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: colors.n20,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    padding: 10,
  },
  credentialsContainer: {
    gap: 4,
  },
  logInContainer: {
    alignItems: "flex-start",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    paddingRight: 40, // Make space for the icon
  },
  eyeIcon: {
    position: "absolute",
    top: 10, // Adjust as needed
    right: 10,
  },
});

export default LoginScreen;
