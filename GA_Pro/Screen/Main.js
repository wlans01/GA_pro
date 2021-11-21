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
const ITEM_SIZE = SCREENWIDTH / 2;

const Main = ({ ismain }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const bgc = scrollX.interpolate({
    inputRange: [0, 1500],
    outputRange: ["rgb(153,153,225)", "rgb(0,0,153)"],
  });

  return (
    <Animated.View style={{ ...styles.contianer, backgroundColor: bgc }}>
      <Image
        source={require("../Image/icon.png")}
        style={{
          width: SCREENWIDTH / 2,
          height: SCREENHEIGHT / 7,
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
      <Text style={{ fontSize: 24, marginTop: -40, marginBottom: 20 }}>
        꾸며볼 컵을 선택해주세요!
      </Text>
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
    height: ITEM_SIZE * 2.2,

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
