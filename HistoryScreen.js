import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen({ route }) {
  const { timePunches } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>
      <ScrollView>
        {timePunches.map((entry, index) => (
          <View key={index} style={styles.historyEntry}>
            <Text style={styles.date}>{formatDate(entry.date)}</Text>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  historyEntry: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const parsedDate = new Date(dateString);

  if (isNaN(parsedDate)) {
    return "Invalid Date";
  }

  return parsedDate.toLocaleDateString(undefined, options);
};
