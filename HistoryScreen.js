import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

export default function HistoryScreen({ route }) {
  const { timePunches } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>History</Text>
      <View>
        {timePunches.map((timePunch, index) => (
          <View style={styles.historyEntry} key={index}>
            <Text style={styles.date}>{getFormattedDate(timePunch.date)}</Text>
            <Text>Start Time: {getFormattedTime(timePunch.clockInTime)}</Text>
            <Text>End Time: {getFormattedTime(timePunch.clockOutTime)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
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

const getFormattedDate = (dateString) => {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const getFormattedTime = (timeString) => {
  const options = { hour: "numeric", minute: "numeric" };
  const time = new Date(`2023-01-01T${timeString}`);
  return time.toLocaleTimeString(undefined, options);
};
