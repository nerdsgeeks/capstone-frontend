import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import NavigationTab from "./Navigation/NavigationTab";
import NavigationTabSupervisor from "./Navigation/NavigationTabSupervisor";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { colors } from "../themes/themes";
import Typography from "./components/Typography/Typography";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Ionicons } from "@expo/vector-icons";

const App = () => {
  const [isFontLoaded, setIsFontLoaded] = React.useState(false);
  const [showHousekeeperDashboard, setShowHousekeeperDashboard] =
    useState(false);
  const [showSupervisorDashboard, setShowSupervisorDashboard] = useState(false);
  const [isDashboardSelected, setIsDashboardSelected] = useState(false);
  const [type, setType] = useState("Manager");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        SatoshiBlack: require("./../assets/fonts/SatoshiBlack.otf"),
        SatoshiMedium: require("./../assets/fonts/SatoshiMedium.otf"),
        SatoshiRegular: require("./../assets/fonts/SatoshiRegular.otf"),
      });
      setIsFontLoaded(true);
    }
    loadFonts();
  }, []);

  if (!isFontLoaded) {
    return <AppLoading />; // Show loading screen while fonts are loading
  }
  const handleHousekeeperDashboardClick = () => {
    setShowHousekeeperDashboard(!showHousekeeperDashboard);
    setIsDashboardSelected(!isDashboardSelected);
  };

  const handleSupervisorDashboardClick = () => {
    setShowSupervisorDashboard(!showSupervisorDashboard);
    setIsDashboardSelected(!isDashboardSelected);
  };

  const handleLogin = () => {
    // Here you can implement your login logic
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Type:", type);

    if (username === "") {
      alert("Username cant be empty");
      return;
    }

    if (password === "") {
      alert("Password cant be empty");
      return;
    }

    switch (type.toUpperCase()) {
      case "Manager".toUpperCase():
        setShowSupervisorDashboard(!showSupervisorDashboard);
        setIsDashboardSelected(!isDashboardSelected);
        break;
      case "Staff".toUpperCase():
        setShowHousekeeperDashboard(!showHousekeeperDashboard);
        setIsDashboardSelected(!isDashboardSelected);
        break;
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      {!isDashboardSelected && (
        <View style={styles.mainContainer}>
          <Button
            title="Housekeeper Dashboard"
            onPress={handleHousekeeperDashboardClick}
          ></Button>
          <Button
            title="Supervisor Dashboard Dashboard"
            onPress={handleSupervisorDashboardClick}
          ></Button>

          {/* <ImageBackground
            source={require("../assets/background.png")}
            style={styles.background}
            resizeMode="cover"
          >
            <View style={styles.content}>
              <Image
                style={styles.image}
                source={require("../assets/login.png")}
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
                value="Manager"
                label={<Typography variant="xs-regular">Manager</Typography>}
              />
              <RadioButtonItem
                value="Staff"
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
          <Button name="Login" type="primary" onPress={handleLogin} /> */}
        </View>
      )}

      {showHousekeeperDashboard && (
        <NavigationContainer>
          <NavigationTab />
        </NavigationContainer>
      )}

      {showSupervisorDashboard && (
        <NavigationContainer>
          <NavigationTabSupervisor />
        </NavigationContainer>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#8fcbbc",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
  },
  // mainContainer: {
  //   flex: 1,
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   marginHorizontal: 55,
  //   gap: 16,
  //   paddingTop: 100,
  // },
  // background: {
  //   width: "100%",
  //   alignItems: "center",
  //   justifySelf: "flex-end",
  // },
  // image: {
  //   marginVertical: 16,
  // },
  // input: {
  //   width: "100%",
  //   height: 40,
  //   borderColor: colors.n20,
  //   borderWidth: 1,
  //   borderRadius: 12,
  //   marginBottom: 20,
  //   padding: 10,
  // },
  // credentialsContainer: {
  //   gap: 4,
  // },
  // logInContainer: {
  //   alignItems: "flex-start",
  // },
  // passwordContainer: {
  //   position: "relative",
  //   width: "100%",
  // },
  // passwordInput: {
  //   paddingRight: 40, // Make space for the icon
  // },
  // eyeIcon: {
  //   position: "absolute",
  //   top: 10, // Adjust as needed
  //   right: 10,
  // },
});

export default App;
