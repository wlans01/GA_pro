import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Stacktab from "./navigation/Stacktab";
import Drag_Drop from "./Screen/Drag_Drop";
import Ga from "./Screen/Ga";
import Main from "./Screen/Main";

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={require("./Image/icon.png")}
        style={{ width: 300, height: 150, marginTop: 50, overflow: "visible" }}
      />
      <Main />
      <StatusBar style="auto" />
    </View>
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
