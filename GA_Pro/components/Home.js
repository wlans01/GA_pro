import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  TouchableOpacity,
  PanResponder,
} from "react-native";

const Home = () => {
  const Position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Position.setOffset({
          x: Position.x._value,
          y: Position.y._value,
        });
      },
      onPanResponderMove: (_, { dx, dy }) => {
        Position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: () => {
        Position.flattenOffset();
      },
    })
  ).current;

  const bgcolor = Position.x.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(222,239,255)", "rgb(252,254,255)"],
  });
  return (
    <View>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          backgroundColor: "red",
          width: 200,
          height: 200,
          transform: [...Position.getTranslateTransform()],
          backgroundColor: bgcolor,
        }}
      ></Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    // backgroundColor: "red",
    // transform: [{ translateY: Y }],
  },
});
