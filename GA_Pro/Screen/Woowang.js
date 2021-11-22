import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Cards from "../components/Cards";

import Drag_DropPrat from "../components/Drag_DropPrat";

const Woowang = () => {
  return (
    <View style={styles.contianer}>
      <Cards />
    </View>
  );
};

export default Woowang;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
