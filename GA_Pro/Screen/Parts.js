import React, { useState } from "react";
import {
  Animated,
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

const ITEM_SIZE = 100;

const Parts = ({ route }) => {
  const { uridata, bgc, data } = route.params;

  const [imguri, setimguri] = useState(uridata);
  const navigation = useNavigation();

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
              width: 350,
              height: 200,
              marginTop: 50,

              overflow: "visible",
            }}
          />
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("Done", {
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
      <Text style={{ fontSize: 36, marginTop: -20 }}>파츠로 꾸며보기</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          //   flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data.parts.map((e) => (
          <Drag_DropPrat data={data.parts} key={e.id} />
        ))}
      </View>
    </Animated.View>
  );
};

export default Parts;

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
    width: 500,
    height: 700,
    borderRadius: 20,
  },
  cupimg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  cupbox: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "visible",
  },
});
