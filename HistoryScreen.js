import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function HistoryScreen({ route }) {
  const { timePunches } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>
      <FlatList
        data={timePunches}
        renderItem={({ item }) => (
          <View style={styles.timePunch}>
            <Text>Date: {item.date}</Text>
            <Text>Clock In: {item.clockInTime}</Text>
            <Text>Clock Out: {item.clockOutTime}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
  timePunch: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
