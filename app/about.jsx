import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from 'expo-router';

const About = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen />
      <Text>About</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default About;
