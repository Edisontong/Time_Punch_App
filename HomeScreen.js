import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [clockedIn, setClockedIn] = useState(false);
  const [timePunches, setTimePunches] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    loadTimePunches();
  }, []);

  useEffect(() => {
    let interval;

    if (clockedIn) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [clockedIn]);

  const saveTimePunches = async (timePunches) => {
    try {
      await AsyncStorage.setItem("timePunches", JSON.stringify(timePunches));
    } catch (error) {
      console.error("Error saving time punches:", error);
    }
  };

  const loadTimePunches = async () => {
    try {
      const storedTimePunches = await AsyncStorage.getItem("timePunches");
      if (storedTimePunches) {
        const parsedTimePunches = JSON.parse(storedTimePunches);
        setTimePunches(parsedTimePunches);
      }
    } catch (error) {
      console.error("Error loading time punches:", error);
    }
  };

  const handleClockIn = () => {
    const currentTime = new Date().toLocaleTimeString();
    const newTimePunch = { date: new Date().toISOString(), clockInTime: currentTime, clockOutTime: "" };
    setClockedIn(true);

    const updatedTimePunches = [...timePunches, newTimePunch];
    setTimePunches(updatedTimePunches);
    saveTimePunches(updatedTimePunches);
  };

  const handleClockOut = () => {
    const currentTime = new Date().toLocaleTimeString();

    if (clockedIn && timePunches.length > 0) {
      const updatedTimePunches = [...timePunches];
      const lastTimePunch = updatedTimePunches[updatedTimePunches.length - 1];

      // Check if the last time punch has a clockInTime but no clockOutTime
      if (lastTimePunch.clockInTime && !lastTimePunch.clockOutTime) {
        lastTimePunch.clockOutTime = currentTime;
        setTimePunches(updatedTimePunches);
        saveTimePunches(updatedTimePunches);
        setClockedIn(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {clockedIn
          ? `Time Elapsed: ${Math.floor(elapsedTime / 3600)}h ${Math.floor((elapsedTime % 3600) / 60)}m ${Math.floor(
              elapsedTime % 60
            )}s`
          : ""}
      </Text>
      <Text>{clockedIn ? "You are clocked in." : "You are clocked out."}</Text>
      {clockedIn ? (
        <View>
          <Button title="Clock Out" onPress={handleClockOut} />
        </View>
      ) : (
        <Button title="Clock In" onPress={handleClockIn} />
      )}
      <Button title="View History" onPress={() => navigation.navigate("History", { timePunches })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
