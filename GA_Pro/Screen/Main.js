import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import data from "../Cupdata";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");
const ITEM_SIZE = SCREENWIDTH / 1.5;

const Main = ({ ismain }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const bgc = scrollX.interpolate({
    inputRange: [0, 1500],
    outputRange: ["rgb(153,153,225)", "rgb(0,0,153)"],
  });

  return (
    <Animated.View style={{ ...styles.contianer }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../Image/icon.png")}
          style={{
            width: SCREENWIDTH / 2.5,
            height: SCREENHEIGHT / 7,
            margin: 30,

            overflow: "visible",
          }}
        />
        <Text style={{ fontSize: 36, marginBottom: 20, marginTop: -20 }}>
          마음에드는 컵을 골라주세요
        </Text>
      </View>
      <Animated.FlatList
        scrollEventThrottle={16}
        data={data}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: ITEM_SIZE / 4,
          justifyContent: "center",
          alignItems: "center",
        }}
        bounces={false}
        ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -100, 0],
          });
          const zIndex = scrollX.interpolate({
            inputRange,
            outputRange: [0, 10, 0],
            extrapolate: "clamp",
          });
          const oPa = scrollX.interpolate({
            inputRange: [
              (index - 2) * ITEM_SIZE,
              ...inputRange,
              (index + 2) * ITEM_SIZE,
            ],
            outputRange: [0.4, 0.7, 1, 0.7, 0.4],
            extrapolate: "clamp",
          });
          const eve = scrollX.interpolate({
            inputRange,
            outputRange: [0, 5, 0],
            extrapolate: "clamp",
          });

          return (
            <Cup
              data={item}
              translateY={translateY}
              zIndex={zIndex}
              oPa={oPa}
              bgc={bgc}
              eve={eve}
            />
          );
        }}
        keyExtractor={(item, index) => index}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    </Animated.View>
  );
};

export default Main;

const Cup = ({ data, translateY, zIndex, oPa, bgc, eve }) => {
  const navigation = useNavigation();
  const onpress = () => {
    navigation.navigate("Ga", { bgc: bgc, data: data });
  };
  return (
    <Pressable onPress={() => onpress()}>
      <Animated.View
        style={{
          ...styles.cupbox,
          opacity: oPa,
          zIndex,

          transform: [{ translateY }],
        }}
      >
        <Image style={styles.cupimg} source={{ uri: data.uri }} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cupbox: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.5,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "visible",
    // marginHorizontal: -50,
  },
  cupimg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  secondbox: {
    width: 350,
    height: 600,
    position: "absolute",
    zIndex: 30,
    backgroundColor: "green",
    borderRadius: 20,
    top: 0,
  },
});
