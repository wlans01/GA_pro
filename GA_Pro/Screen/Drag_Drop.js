import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Animated, PanResponder } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Drag_Drop = ({ data }) => {
  //values
  const scale = useRef(new Animated.Value(1)).current;
  const Position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  //Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });
  const onPressout = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const gocenter = Animated.spring(Position, {
    toValue: 0,
    tension: 5,
    useNativeDriver: true,
  });
  const ondrop = Animated.spring(scale, {
    toValue: 0,
    useNativeDriver: true,
  });
  const goHome = Animated.timing(Position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const onHome = Animated.timing(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  //panResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderMove: (_, { dx, dy }) => {
        Position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -250) {
          Animated.sequence([
            ondrop,
            Animated.parallel([goHome, onHome]),
          ]).start();
          console.log("새로운거");
        } else {
          Animated.parallel([onPressout, goHome]).start();
        }
      },
    })
  ).current;
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        ...styles.iconbox,
        transform: [...Position.getTranslateTransform(), { scale }],
      }}
    >
      <Ionicons name="beer" color="black" size={64} />
    </Animated.View>
  );
};

export default Drag_Drop;

const styles = StyleSheet.create({
  iconbox: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    zIndex: 50,
  },
});
