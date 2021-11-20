import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Done = () => {
  return (
    <View style={styles.container}>
      <Text> 나만의 컵 완성!</Text>
    </View>
  );
};

export default Done;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
