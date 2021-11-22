import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import data from "../Cupdata";
import Drag_Drop from "./Drag_Drop";
import HolderW from "../HolderW";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Drag_DropPrat from "../components/Drag_DropPrat";
const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");
const ITEM_SIZE = SCREENWIDTH / 1.5;

const Parts = ({ route }) => {
  const { uridata, bgc, data } = route.params;

  const [imguri, setimguri] = useState(uridata);
  const [isDone, setisDone] = useState(false);
  const navigation = useNavigation();
  const scale = useRef(new Animated.Value(0.5)).current;
  const scale2 = useRef(new Animated.Value(10)).current;

  const constant = useRef(new Animated.Value(1)).current;
  const Done = () => {
    setisDone(true);
    Animated.parallel([small, big]).start(stamp.start());
  };

  const restart = () => {
    setisDone(false);
    constant.setValue(1);
    scale.setValue(0.5);
    scale2.setValue(10);
  };
  const big = Animated.spring(scale, {
    toValue: 1.7,
    useNativeDriver: true,
  });

  const small = Animated.spring(constant, {
    toValue: 0,
    tension: 1,
    useNativeDriver: true,
  });

  const stamp = Animated.spring(scale2, {
    toValue: 1.5,
    tension: 1,
    delay: 500,
    useNativeDriver: true,
  });

  const scale1 = constant.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.3, 1],
  });

  const opacity = scale.interpolate({
    inputRange: [0.5, 1.7],
    outputRange: [0, 1],
  });

  const opacity2 = scale2.interpolate({
    inputRange: [1, 10],
    outputRange: [1, 0],
  });
  return (
    <Animated.View style={{ ...styles.contianer }}>
      <Animated.View
        style={{
          flex: 1,
          width: SCREENWIDTH,
          opacity: isDone ? 0 : 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "center",
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" color="black" size={98} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Main")}>
            <Image
              source={require("../Image/icon.png")}
              style={{
                width: SCREENWIDTH / 2.5,
                height: SCREENHEIGHT / 7,
                margin: 30,
                overflow: "visible",
              }}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("Woowang", {
                uridata: imguri,
                bgc: bgc,
                data: data,
              })
            }
          >
            <Ionicons name="chevron-forward-sharp" color="black" size={98} />
          </Pressable>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 36, marginTop: -20 }}>
            {isDone ? "완성" : "컵을 꾸며보세요"}
          </Text>
        </View>
      </Animated.View>

      <Animated.Image
        style={{ ...styles.mainimage, transform: [{ scale: scale1 }] }}
        source={{
          uri: imguri,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          bottom: 0,
        }}
      >
        {data.parts.map((e) => (
          <Drag_DropPrat data={e} isDone={isDone} key={e.id} />
        ))}
      </View>
      <Pressable
        style={{ position: "absolute", right: 50 }}
        onPress={() => Done()}
      >
        <Text style={{ fontSize: 52 }}>완료하기</Text>
      </Pressable>
      <Pressable
        style={{ position: "absolute", left: 50 }}
        onPress={() => restart()}
      >
        <Text style={{ fontSize: 52 }}>다시하기</Text>
      </Pressable>
      {isDone ? (
        <Animated.Image
          source={require("../Image/icon.png")}
          style={{
            width: SCREENWIDTH / 2.5,
            height: SCREENHEIGHT / 7,
            margin: 30,
            position: "absolute",
            top: 30,
            opacity,
            transform: [{ scale }],
          }}
        />
      ) : null}
      {isDone ? (
        <Animated.Image
          source={require("../Image/done.png")}
          style={{
            width: SCREENWIDTH / 2.5,
            height: SCREENHEIGHT / 7,
            margin: 30,
            position: "absolute",

            opacity: opacity2,
            transform: [{ scale: scale2 }],
          }}
        />
      ) : null}
    </Animated.View>
  );
};

export default Parts;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainimage: {
    flex: 1,
    position: "absolute",
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.5,
    borderRadius: 20,
    resizeMode: "contain",
    bottom: 200,
  },
});
