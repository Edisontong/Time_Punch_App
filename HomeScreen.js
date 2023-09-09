import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [clockedIn, setClockedIn] = useState(false);

  const handleClockIn = async () => {
    const currentTime = new Date().toLocaleTimeString();
    const timePunch = { clockInTime: currentTime, clockOutTime: "" };
    await AsyncStorage.setItem("timePunch", JSON.stringify(timePunch));
    setClockedIn(true);
  };

  const handleClockOut = async () => {
    const currentTime = new Date().toLocaleTimeString();
    const storedTimePunch = await AsyncStorage.getItem("timePunch");

    if (storedTimePunch) {
      const timePunch = JSON.parse(storedTimePunch);
      timePunch.clockOutTime = currentTime;

      await AsyncStorage.setItem("timePunch", JSON.stringify(timePunch));
      setClockedIn(false);
    }
  };

  useEffect(() => {
    // Load time punch data and check if currently clocked in
    async function loadTimePunchData() {
      const storedTimePunch = await AsyncStorage.getItem("timePunch");
      if (storedTimePunch) {
        const timePunch = JSON.parse(storedTimePunch);
        setClockedIn(!!timePunch.clockOutTime);
      }
    }
    loadTimePunchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{clockedIn ? "You are clocked in." : "You are clocked out."}</Text>
      {clockedIn ? (
        <Button title="Clock Out" onPress={handleClockOut} />
      ) : (
        <Button title="Clock In" onPress={handleClockIn} />
      )}
      <Button title="View History" onPress={() => navigation.navigate("History")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
