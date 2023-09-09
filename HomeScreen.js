import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  const [clockedIn, setClockedIn] = useState(false);
  const [timePunches, setTimePunches] = useState([]); // Maintain a list of time punches

  const handleClockIn = () => {
    const currentTime = new Date().toLocaleTimeString();
    const newTimePunch = { clockInTime: currentTime, clockOutTime: "" };
    setClockedIn(true);

    // Add the new time punch to the list
    setTimePunches([...timePunches, newTimePunch]);
  };

  const handleClockOut = () => {
    const currentTime = new Date().toLocaleTimeString();

    // Update the latest time punch's clockOutTime
    if (timePunches.length > 0) {
      const updatedTimePunches = [...timePunches];
      updatedTimePunches[timePunches.length - 1].clockOutTime = currentTime;
      setTimePunches(updatedTimePunches);
    }

    setClockedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text>{clockedIn ? "You are clocked in." : "You are clocked out."}</Text>
      {clockedIn ? (
        <Button title="Clock Out" onPress={handleClockOut} />
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
});
