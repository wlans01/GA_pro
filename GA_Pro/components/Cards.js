import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icons from "../Icons";

const Cards = () => {
  //values
  const scale = useRef(new Animated.Value(1)).current;
  const Position = useRef(new Animated.Value(0)).current;
  const rotation = Position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
  });

  const secondScale = Position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.5, 1],
    extrapolate: "clamp",
  });
  //Animations
  const onPressIn = () =>
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  const onPressout = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  const goLeft = Animated.spring(Position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restSpeedThreshold: 100,
    restDisplacementThreshold: 100,
  });

  const goright = Animated.spring(Position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
    restSpeedThreshold: 100,
    restDisplacementThreshold: 100,
  });

  const gocenter = Animated.spring(Position, {
    toValue: 0,
    tension: 5,
    useNativeDriver: true,
  });

  //panResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onPressIn();
      },
      onPanResponderMove: (_, { dx }) => {
        Position.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -250) {
          goLeft.start(onDismiss);
        } else if (dx > 250) {
          goright.start(onDismiss);
        } else {
          onPressout();
          gocenter.start();
        }
      },
    })
  ).current;
  //state
  const [index, setindex] = useState(0);
  const onDismiss = () => {
    Position.setValue(0);
    setindex((prev) => prev + 1);
  };

  //btn function
  const closepress = () => {
    goLeft.start(onDismiss);
  };
  const checkpress = () => {
    goright.start(onDismiss);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            backgroundColor: "white",
            width: 300,
            height: 300,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            shadowColor: "#000000",
            shadowOpacity: 0.3,
            shadowOffset: { width: 2, height: 2 },
            elevation: 5,
            position: "absolute",
            transform: [{ scale: secondScale }],
          }}
        >
          <Ionicons name={Icons[index + 1]} color="black" size={98} />
        </Animated.View>
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            backgroundColor: "white",
            width: 300,
            height: 300,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            shadowColor: "#000000",
            shadowOpacity: 0.3,
            shadowOffset: { width: 2, height: 2 },
            elevation: 5,
            position: "absolute",
            transform: [
              { scale },
              { translateX: Position },
              { rotateZ: rotation },
            ],
          }}
        >
          <Ionicons name={Icons[index]} color="black" size={98} />
        </Animated.View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Pressable onPress={closepress}>
          <Ionicons name="close-circle" color="white" size={72} />
        </Pressable>
        <Pressable onPress={checkpress}>
          <Ionicons name="checkmark-circle" color="white" size={72} />
        </Pressable>
      </View>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({});
