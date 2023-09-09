import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const storedTimePunch = await AsyncStorage.getItem("timePunch");
      if (storedTimePunch) {
        const timePunch = JSON.parse(storedTimePunch);
        setHistory([timePunch]);
      }
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {history.map((entry, index) => (
          <View key={index} style={styles.historyEntry}>
            <Text>Clock In: {entry.clockInTime}</Text>
            <Text>Clock Out: {entry.clockOutTime}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  historyEntry: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});
