import React from "react";
import { View, Text, StyleSheet } from "react-native";

 function ParkingCard({ title, spots }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>{spots} spots available</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    color: '#666',
  },
});

export default ParkingCard;