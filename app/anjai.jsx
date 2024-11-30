import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { Stack } from "expo-router";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const Anjai = () => {
  const opacityVal = useSharedValue(0);

  const openModal = () => {
    opacityVal.value = 0;
    opacityVal.value = withTiming(1, { duration: 1000 });
  }
  const closeModal = () => {
    opacityVal.value = 1;
    opacityVal.value = withTiming(0, { duration: 1000 });
  }

  return (
    <View style={styles.centeredView}>
      <Stack.Screen />
      <Animated.View style={[styles.modalView, { opacity: opacityVal }]}>
        <Text>Modal</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => closeModal()}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </Animated.View>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => openModal()}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 0,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Anjai;