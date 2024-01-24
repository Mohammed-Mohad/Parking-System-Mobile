import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import Section from "./Section";
import LocationPicker from "./LocationPicker";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { database } from "./firebase";
import { onValue, ref } from "firebase/database";

const Stack = createStackNavigator();

export default function App() {
  const [dataAva, setDataAva] = useState();
  const db = database;
  const starCountRef = ref(db, "test");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setTimeout(() => {
        console.log('====================================');
        console.log(data.count);
        console.log('====================================');
        setDataAva(data.count);
      }, 2000);
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (dataAva !== undefined) {
      setIsLoading(false);
    }
  }, [dataAva]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LocationPicker"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="LocationPicker"
          component={LocationPicker}
          initialParams={{ count: dataAva }}
          options={{ title: "Pick a Location" }}
        />
        <Stack.Screen
          name="Section"
          component={Section}
          options={{ title: "Buildings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}