import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "../Screen/Main";
import Ga from "../Screen/Ga";
import Woowang from "../Screen/Woowang";
import DeliveryPeople from "../Screen/DeliveryPeople";

const Stack = createNativeStackNavigator();

const Stacktab = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Ga} name="Ga" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacktab;

const styles = StyleSheet.create({});
