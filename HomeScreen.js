// HomeScreen.js

import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [clockedIn, setClockedIn] = useState(false);

  const handleClockIn = async () => {
    const currentTime = new Date().toLocaleTimeString();
    await AsyncStorage.setItem("clockInTime", currentTime);
    setClockedIn(true);
  };

  const handleClockOut = async () => {
    const currentTime = new Date().toLocaleTimeString();
    await AsyncStorage.setItem("clockOutTime", currentTime);
    setClockedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text>{clockedIn ? "You are clocked in." : "You are clocked out."}</Text>
      <View style={styles.buttonContainer}>
        <Button title={clockedIn ? "Clock Out" : "Clock In"} onPress={clockedIn ? handleClockOut : handleClockIn} />
      </View>
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
  buttonContainer: {
    marginTop: 20, // Adjust the margin as needed
  },
});
