import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
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
    <View>
      {clockedIn ? <Text>You are clocked in.</Text> : <Text>You are clocked out.</Text>}
      <Button title={clockedIn ? "Clock Out" : "Clock In"} onPress={clockedIn ? handleClockOut : handleClockIn} />
      <Button title="View History" onPress={() => navigation.navigate("History")} />
    </View>
  );
};

export default HomeScreen;
