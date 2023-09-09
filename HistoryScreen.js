import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    const clockInTime = await AsyncStorage.getItem("clockInTime");
    const clockOutTime = await AsyncStorage.getItem("clockOutTime");
    if (clockInTime && clockOutTime) {
      const entry = { clockInTime, clockOutTime };
      setHistory([entry, ...history]);
    }
  };

  return (
    <View>
      <Button title="Load History" onPress={loadHistory} />
      {history.map((entry, index) => (
        <View key={index}>
          <Text>Clock In: {entry.clockInTime}</Text>
          <Text>Clock Out: {entry.clockOutTime}</Text>
        </View>
      ))}
    </View>
  );
}
