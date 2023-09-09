import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen({ route }) {
  const { timePunches } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        {timePunches.map((entry, index) => (
          <View key={index} style={styles.historyEntry}>
            <Text style={styles.dayOfWeek}>{formatDayOfWeek(entry.date)}</Text>
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
  date: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: "bold",
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

const formatDayOfWeek = (dateString) => {
  const options = { weekday: "long" };
  const parsedDate = new Date(dateString);

  if (isNaN(parsedDate)) {
    return "Invalid Date";
  }

  return parsedDate.toLocaleDateString(undefined, options);
};
