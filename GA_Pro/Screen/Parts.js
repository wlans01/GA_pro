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

  return (
    <Animated.View style={{ ...styles.contianer }}>
      <View
        style={{
          flex: 1,
          width: SCREENWIDTH,
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
            원하는대로 꾸며보세요
          </Text>
        </View>
      </View>

      <Image
        style={styles.mainimage}
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
        onPress={() => setisDone(true)}
      >
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: "red",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text style={{ fontSize: 64 }}>완성!</Text>
        </View>
      </Pressable>
      <Pressable
        style={{ position: "absolute", left: 50 }}
        onPress={() => setisDone(false)}
      >
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: "red",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text style={{ fontSize: 64 }}>다시하기!</Text>
        </View>
      </Pressable>
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
