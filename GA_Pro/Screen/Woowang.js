import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Cards from "../components/Cards";
import ParticleBackground from "react-native-particle-background";

const Woowang = () => {
  return (
    <View style={styles.contianer}>
      <ParticleBackground
        particleColor="#rgba(192,192,192,0.3)"
        particleSize={10}
        particleDispersion={100}
      />
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
