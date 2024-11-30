import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown: false}} />
  );
}

export default _layout;