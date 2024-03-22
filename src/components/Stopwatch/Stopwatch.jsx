import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import Typography from "../Typography/Typography";
import ClockIcon from "../../SVG/ClockIcon";
import { colors } from "../../../themes/themes";
import { useRoomDetailsStore } from "../../store/roomStore";

const Stopwatch = ({ isRunning }) => {
  // const [isRunningStopwatch, setIsRunningStopwatch] = useState(isRunning);

  const roomDetailsStore = useRoomDetailsStore(
    (state) => state.roomDetailsStore,
  );
  const updateRoomDetailsStore = useRoomDetailsStore(
    (state) => state.updateRoomDetailsStore,
  );
  const parseTimeToMilliseconds = (timeString) => {
    const parts = timeString.split(":").map((part) => parseInt(part, 10));
    const hours = parts[0];
    const minutes = parts[1];
    const seconds = parts[2];

    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };
  const [elapsedTime, setElapsedTime] = useState(
    roomDetailsStore.cleaningStatus.toUpperCase() === "Cleaned".toUpperCase() ||
      roomDetailsStore.cleaningStatus.toUpperCase() === "Approved".toUpperCase()
      ? parseTimeToMilliseconds(
          new Date(roomDetailsStore.cleaningDuration)
            .toISOString()
            .split("T")[1]
            .split(".")[0],
        )
      : 0,
  );
  // console.log(isRunningStopwatch);
  // console.log(isRunning);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => {
          const newElapsedTime = prevElapsedTime + 1000;
          // Update roomDetailsStore inside here using the latest elapsedTime
          const formattedTime = formatTime(newElapsedTime);
          roomDetailsStore.cleaningDuration =
            new Date().toISOString().split("T")[0] + "T" + formattedTime + "Z";
          roomDetailsStore.cleaningDurationUnformatted = newElapsedTime;
          updateRoomDetailsStore(roomDetailsStore);

          return newElapsedTime;
        });
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
    gap: 18,
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    backgroundColor: colors.pale_teal2,
  },
});

export default Stopwatch;
