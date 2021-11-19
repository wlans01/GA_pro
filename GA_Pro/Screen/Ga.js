import React from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import data from "../dataTest";
import Drag_Drop from "./Drag_Drop";

const ITEM_SIZE = 100;

const Ga = () => {
  return (
    <View style={styles.contianer}>
      <Image
        style={styles.mainimage}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/good-attitude.appspot.com/o/users%2Fwlans01%40naver.com%2Fprofile_Img%2F182bf002-73c9-4b8d-b5be-ed05cf5f841f?alt=media&token=7bcc01b6-bf67-442d-a4e9-bc7d0dbbb6d5",
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
        }}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <Drag_Drop data={item} />}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const CupHolder = ({ data }) => {
  const onpress = () => {
    console.log(data.id);
  };
  return (
    <Pressable onPress={() => onpress()}>
      <View
        style={{
          ...styles.cupbox,
        }}
      >
        <Image style={styles.cupimg} source={{ uri: data.uri }} />
      </View>
    </Pressable>
  );
};

export default Ga;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainimage: {
    width: 300,
    height: 450,
    borderRadius: 20,
    position: "absolute",
    top: 0,
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
