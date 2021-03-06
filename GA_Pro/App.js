import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Ga from "./Screen/Ga";
import Main from "./Screen/Main";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Parts from "./Screen/Parts";
import Done from "./Screen/Done";
import Woowang from "./Screen/Woowang";

const Stack = createNativeStackNavigator();

export default function App() {
  const [ismain, setismain] = useState(true);
  const scale = useRef(new Animated.Value(1)).current;
  const scaletwo = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const onpress = () => {
    if (ismain) {
      onscaletwo.start();
      setismain(false);
    } else {
      onscale.start();
      setismain(true);
    }
  };

  const onscale = Animated.spring(scale, {
    toValue: 0,
    useNativeDriver: true,
  });
  const onscaletwo = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            presentation: "modal",
          }}
        >
          <Stack.Screen component={Main} name="Main" />
          <Stack.Screen component={Ga} name="Ga" />

          <Stack.Screen component={Parts} name="Parts" />
          <Stack.Screen component={Done} name="Done" />
          <Stack.Screen component={Woowang} name="Woowang" />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00a8ff",
    alignItems: "center",
    justifyContent: "center",
  },
});
