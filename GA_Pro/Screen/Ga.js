import React, { useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import data from "../dataTest";
import Drag_Drop from "../components/Drag_Drop";

import { useNavigation } from "@react-navigation/native";

const ITEM_SIZE = 100;

const Ga = ({ ismain }) => {
  const [imguri, setimguri] = useState(
    "https://firebasestorage.googleapis.com/v0/b/good-attitude.appspot.com/o/users%2Fwlans01%40naver.com%2Fprofile_Img%2F182bf002-73c9-4b8d-b5be-ed05cf5f841f?alt=media&token=7bcc01b6-bf67-442d-a4e9-bc7d0dbbb6d5"
  );
  const navigation = useNavigation();
  const changeimg = (uri) => {
    setimguri(uri);
  };
  return (
    <Animated.View style={{ ...styles.contianer }}>
      <Pressable onPress={() => navigation.navigate("Main")}>
        <Image
          source={require("../Image/icon.png")}
          style={{
            width: 200,
            height: 80,
            marginTop: 50,

            overflow: "visible",
          }}
        />
      </Pressable>

      <Image
        style={styles.mainimage}
        source={{
          uri: imguri,
        }}
      />

      <FlatList
        scrollEventThrottle={16}
        data={data}
        horizontal
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
    width: 300,
    height: 450,
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
