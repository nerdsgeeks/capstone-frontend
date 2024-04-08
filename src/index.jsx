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
  // Button,
} from "react-native";
import NavigationTab from "./Navigation/NavigationTab";
import NavigationTabSupervisor from "./Navigation/NavigationTabSupervisor";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { colors } from "../themes/themes";
import Typography from "./components/Typography/Typography";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Ionicons } from "@expo/vector-icons";
import Button from "./components/Button/Button";
import useBaseUrl from "./hooks/useBaseUrl";
import axios from "axios";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "./store/employeeStore";

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
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = useBaseUrl();

  const accessTokenStore = useAccessTokenStore(
    (state) => state.accessTokenStore,
  );
  const updateAccessTokenStore = useAccessTokenStore(
    (state) => state.updateAccessTokenStore,
  );

  const employeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.employeeDetailsStore,
  );
  const updateEmployeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.updateEmployeeDetailsStore,
  );

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
    const apiUrl = baseUrl + "/api/auth/login";

    if (username === "") {
      alert("Username cannot be empty");
      return;
    }

    if (password === "") {
      alert("Password cannot be empty");
      return;
    }

    const loginDetails = {
      employeeid: username,
      password: password,
    };

    const onLoginAuth = () =>
      axios
        .post(apiUrl, loginDetails)
        .then((response) => {
          const data = response.data;
          console.log("data");
          console.log(data);
          const employeeType = data.EmployeeType === 1 ? "Manager" : "Staff";

          if (employeeType.toUpperCase() !== type.toUpperCase()) {
            alert("Incorrect Employee Id or Password");
            return;
          }

          const accessToken = data.accessToken;
          updateAccessTokenStore(accessToken);

          const employeeDetails = {
            employeeType: data.EmployeeType,
            firstName: data.FirstName,
            lastName: data.LastName,
            userId: data.userID,
            imageURL: data.imageURL,
          };
          updateEmployeeDetailsStore(employeeDetails);

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
        })
        .catch((error) => {
          console.log(error);
          alert("Incorrect Employee Id or Password");
        });

    onLoginAuth();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      {!isDashboardSelected && (
        <View style={styles.mainContainer}>
          {/* <Button
            title="Housekeeper Dashboard"
            onPress={handleHousekeeperDashboardClick}
          ></Button>
          <Button
            title="Supervisor Dashboard Dashboard"
            onPress={handleSupervisorDashboardClick}
          ></Button> */}

          <ImageBackground
            source={require("../assets/illustrations/Background.png")}
            style={styles.background}
            resizeMode="cover"
          >
            <View style={styles.content}>
              <Image
                style={styles.image}
                source={require("../assets/illustrations/Login.png")}
              />
            </View>
          </ImageBackground>

          <View style={{marginHorizontal: 55, gap:30}}>
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
            <Button name="Login" type="primary" onPress={handleLogin} />
          </View>
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
  // mainContainer: {
  //   flex: 1,
  //   backgroundColor: "#8fcbbc",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   rowGap: 10,
  // },
  mainContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 30,
    // paddingTop: 100,
  },
  background: {
    width: "100%",
    alignItems: "center",
    justifySelf: "flex-end",
    paddingTop: 100,
  },
  image: {
    marginVertical: 16,
    width: 138*1.2,
    height: 137*1.2,
    
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

export default App;
