import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, Platform, StatusBar } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

export default function Scan() {
  const sv = useSharedValue(1);
  const [permission, requestPermission] = useCameraPermissions();
  const [urlLink, setUrlLink] = useState("");
  const [sound, setSound] = useState();
  const router = useRouter();
  
  const playSound = async () => {
    const {sound} = await Audio.Sound.createAsync(require("@/assets/sound/zxing_beep.mp3"));
    setSound(sound);
    await sound.playAsync();
  }

  // Gaya animasi
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: sv.value,
    };
  });

  useEffect(() => {
    sv.value = withRepeat(withTiming(0, { duration: 300 }), -1, true);
  }, []);

  // Validasi izin kamera
  if (!permission || !permission.granted) {
    requestPermission();
  }

  const handleBarcodeScan = async ({ data }) => {
    if (!urlLink) {
      let url = encodeURIComponent(data);
      setUrlLink(url);
      console.log(url);
      await playSound();
      await router.replace(`/result?url=${url}`);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      { !permission ? <View /> :
        (<CameraView
          style={StyleSheet.absoluteFillObject}
          type="back"
          onBarcodeScanned={handleBarcodeScan}
        >
          <View style={styles.cam}>
            <Image style={styles.overlay} source={require("@/assets/overlay.png")} />
            <Animated.View style={[styles.barLine, animatedStyle]} ></Animated.View>
          </View>
        </CameraView>)
      }
    </View>
  );
}

const OpenWeb = ({ url }) => {
  
  return (
    <WebView
      style={StyleSheet.absoluteFillObject}
      source={{uri: url}}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    transform: [{ scale: 1.2 }],
    opacity: 0.4,
  },
  tip: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  cam: {
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barLine: {
    width: '100%',
    maxWidth: 420,
    height: 1.6,
    backgroundColor: 'red',
    position: 'absolute',
    opacity: .8,
  }
});