import React, { useState } from "react";
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

import Drag_Drop from "./Drag_Drop";
import HolderW from "../HolderW";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");
const ITEM_SIZE = SCREENWIDTH / 1.3;

const Ga = ({ route }) => {
  const { bgc, data } = route.params;

  const [imguri, setimguri] = useState(data.uri);
  const navigation = useNavigation();
  const changeimg = (uri) => {
    setimguri(uri);
  };
  return (
    <Animated.View style={{ ...styles.contianer, backgroundColor: bgc }}>
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
              width: SCREENWIDTH / 2,
              height: SCREENHEIGHT / 7,
              marginTop: 50,

              overflow: "visible",
            }}
          />
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("Parts", {
              uridata: imguri,
              bgc: bgc,
              data: data,
            })
          }
        >
          <Ionicons name="chevron-forward-sharp" color="black" size={98} />
        </Pressable>
      </View>
      <Image
        style={styles.mainimage}
        source={{
          uri: imguri,
        }}
      />
      <Text style={{ fontSize: 36, marginTop: -20 }}>컵홀더정하기</Text>
      <View style={{ flexDirection: "row", flex: 1 }}>
        {/* <View style={styles.sidebar}>
          <Text>컵선택</Text>
          <Text>컵홀더 선택</Text>
          <Text>파츠 꾸미기</Text>
          <Text>나만의컵 완성~</Text>
        </View> */}
        <FlatList
          scrollEventThrottle={16}
          data={data.Holder}
          horizontal
          bounces={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "flex-end",
            marginBottom: 30,
            zIndex: 50,
          }}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Drag_Drop data={item} changeimg={changeimg} />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    </Animated.View>
  );
};

export default Ga;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00a8ff",
  },
  mainimage: {
    flex: 1,
    position: "absolute",
    width: ITEM_SIZE,
    height: SCREENHEIGHT / 2,
    borderRadius: 20,
  },

  sidebar: {
    width: 100,
    backgroundColor: "red",
    height: 450,
    justifyContent: "space-between",
    alignContent: "center",
  },
});
