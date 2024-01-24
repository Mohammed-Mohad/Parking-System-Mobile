import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Section({ route }) {
  const { buildings } = route.params || {}; // Provide an empty object as a fallback
console.log(buildings);
// console.log(count);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Available Parking Buildings</Text>
      <View style={styles.grid}>
        {buildings &&
          buildings.map((building, index) => (
            <View key={index} style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>{building.name}</Text>
                <Text style={styles.cardText}>
                  {building.spots} spots available
                </Text>
              </View>
            </View>
          
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  grid: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardText: {
    color: "#666",
  },
});
