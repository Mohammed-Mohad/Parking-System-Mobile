import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getDatabase, onValue, ref, off } from "firebase/database";

export default function LocationPicker({ route, navigation }) {
  // console.log(route);


  const [count, setCount] = useState();
  const [selectedLocation, setSelectedLocation] = useState("meganagna");

  useEffect(() => {
    const db = getDatabase();
    const countRef = ref(db, "test/count");

    // Set up a listener for changes in the count value in Firebase
    const listener = onValue(countRef, (snapshot) => {
      setCount(snapshot.val());
    });

    // Clean up the listener when the component unmounts
    return () => off(countRef, listener);
  }, []);

  console.log(count);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Parking Location</Text>
      <Text style={styles.description}>
        Please select your preferred parking location from the dropdown below.
      </Text>

      <View style={styles.card}>
        <View style={styles.form}>
          <Text style={styles.label}>Location</Text>
          <Picker
            selectedValue={selectedLocation}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLocation(itemValue)
            }
            style={styles.picker}
          >
            <Picker.Item label="Meganagna" value="meganagna" />
            <Picker.Item label="Piassa" value="piassa" />
            <Picker.Item label="Bole" value="bole" />
            <Picker.Item label="Mexico" value="mexico" />
          </Picker>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (selectedLocation == null) {
                alert("Please select a location");
              } else if (selectedLocation == "meganagna") {
                if (count >= 0 && count <= 20) {
                  navigation.navigate("Section", {
                    buildings: [
                      { name: "Zefmesh", spots: 20 - count },
                      { name: "Metababer", spots: 30 },
                    ],
                  });
                } else {
                  Alert.alert(
                    "Invalid count. Count should be a number between 0 and 20."
                  );
                }
              } else if (selectedLocation == "piassa") {
                navigation.navigate("Section", {
                  buildings: [
                    { name: "Eliana", spots: 30 },
                    { name: "Adwa", spots: 70 },
                  ],
                });
              } else if (selectedLocation == "bole") {
                navigation.navigate("Section", {
                  buildings: [
                    { name: "Friendship Tower", spots: 50 },
                    { name: "Edna Mall", spots: 50 },
                  ],
                });
              } else if (selectedLocation == "mexico") {
                navigation.navigate("Section", {
                  buildings: [
                    { name: "Wabi Shebelle", spots: 26 },
                    { name: "Debrework", spots: 30 },
                  ],
                });
              } else {
                alert("This location is not available");
              }
            }}
          >
            <Text style={styles.buttonText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#eaeaea",
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  card: {
    width: "100%",
    maxWidth: 500,
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    // offset:""
  },
  form: {
    marginTop: 30,
  },
  label: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 0,
    color: "#333",
  },
  picker: {
    height: 70,
    width: "100%",
    borderColor: "#ccc",
    // borderWidth: 1,
    // borderRadius: 10,
    // backgroundColor: '#fff',
    marginBottom: 30,
  },
  button: {
    marginTop: 100,
    backgroundColor: "#1abc9c",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
