import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function HistoryScreen({ route }) {
  const { timePunches } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        {timePunches.map((entry, index) => (
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
