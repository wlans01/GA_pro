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
import data from "../dataTest";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");
const ITEM_SIZE = 200;

const Main = ({ ismain }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Animated.View style={{ ...styles.contianer }}>
      <Image
        source={require("../Image/icon.png")}
        style={{
          width: 300,
          height: 150,
          marginTop: 50,
          overflow: "visible",
        }}
      />
      <Animated.FlatList
        scrollEventThrottle={16}
        data={data}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
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
            outputRange: [0, 0.8, 1, 0.8, 0],
            extrapolate: "clamp",
          });

          return (
            <Cup
              data={item}
              translateY={translateY}
              zIndex={zIndex}
              oPa={oPa}
            />
          );
        }}
        keyExtractor={(item, index) => index}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      <Text style={{ fontSize: 24, marginTop: -40, marginBottom: 20 }}>
        꾸며볼 컵을 선택해주세요!
      </Text>
    </Animated.View>
  );
};

export default Main;

const Cup = ({ data, translateY, zIndex, oPa }) => {
  const navigation = useNavigation();
  const onpress = () => {
    navigation.navigate(data.go);
  };
  return (
    <Pressable onPress={() => onpress(data)}>
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

const Contens = () => {
  return (
    <>
      <Image />
    </>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00a8ff",
  },
  cupbox: {
    width: ITEM_SIZE,
    height: 500,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "visible",
  },
  cupimg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
