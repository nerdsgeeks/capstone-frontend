import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import Typography from "../Typography/Typography";
import ClockIcon from "../../SVG/ClockIcon";
import { colors } from "../../../themes/themes";

const Stopwatch = ({ isRunning }) => {
  // const [isRunningStopwatch, setIsRunningStopwatch] = useState(isRunning);
  const [elapsedTime, setElapsedTime] = useState(0);

  // console.log(isRunningStopwatch);
  console.log(isRunning);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // const handleStart = () => {
  //   setIsRunning(true);
  // };

  // const handlePause = () => {
  //   setIsRunning(false);
  // };

  // const handleStop = () => {
  //   setIsRunning(false);
  //   setElapsedTime(0);
  // };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    const formatNumber = (number) => `0${number}`.slice(-2);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  };

  return (
    <View>
      <View style={styles.container}>
        <ClockIcon fill={colors.teal} />
        <Typography variant="small-medium">
          {formatTime(elapsedTime)}
        </Typography>
      </View>
      {/* switch buttons with the ones in the UI to make it work */}
      {/* <View style={styles.buttonContainer}>
        {!isRunning ? (
          <Button title="Start" onPress={handleStart} />
        ) : (
          <Button title="Pause" onPress={handlePause} />
        )}
        <Button title="Stop" onPress={handleStop} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 25,
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    backgroundColor: colors.pale_teal2,
  },
});

export default Stopwatch;
