import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Alert, Text, StyleSheet, Pressable, TouchableHighlight as TouchBtn, StatusBar, Platform, Dimensions } from "react-native";
import { Stack, useRouter, useLocalSearchParams, useGlobalSearchParams, useSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { colors } from "@/components/Colors.js";
import { useBatteryLevel } from "expo-battery";
import { GestureHandlerRootView, GestureDetector, Gesture } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Result = () => {
  const [bottomSheetIdx, setBottomSheetIdx] = useState(-1);
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  const router = useRouter();
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();
  const { url } = local;
  
  // useEffect(() => {
//     return () => {
//       setCurrentUrl(url);
//     }
//   }, [currentUrl])

  const batteryLevel = useBatteryLevel();

  // ref
  const bottomSheetRef = useRef(null);
  const bottomBarRef = useRef(null);
  const webViewRef = useRef(null);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const [isOpenWeb, setIsOpenWeb] = React.useState(false);

  const handleScroll = (e) => {
    console.log(e);
  }

  const handleGoBack = () => {
    if (webViewRef.current) {
      if (canGoBack){
        webViewRef.current?.goBack();
      }
    }
  }
  const handleGoForward = () => {
    if (webViewRef.current) {
      if (canGoForward){
        webViewRef.current?.goForward();
      }
    }
  }
  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current?.reload();
    }
  }
  const handleReturnWeb = () => {
    if (url != currentUrl){
      setCurrentUrl(url);
    }
  }
  
  const handleBottomSheet = () => {
    if (bottomSheetIdx >= -1){
      bottomSheetRef.current?.close();
    }
    bottomSheetRef.current?.expand();
  }

  return (
    <GestureHandlerRootView style={[styles.container, { backgroundColor: isOpenWeb ? '#222222' : 'black', }]}>
      <Stack.Screen />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      {
        isOpenWeb ? (
          <View style={styles.webContainer}>
            <WebView ref={webViewRef} style={[{ height: '100%' }]}
              source={{ uri: currentUrl ? currentUrl : url }}
              onNavigationStateChange={navState => {
                setCanGoBack(navState.canGoBack);
                setCanGoForward(navState.canGoForward)
                setCurrentUrl(navState.url)
              }}
              onRenderProcessGone={() => console.log('loaded')}
            />
            <BottomSheet
              ref={bottomSheetRef}
              onChange={handleSheetChanges}
              enablePanDownToClose={true}
              snapPoints={['50%']}
              enableContentPanningGesture={false}
              index={bottomSheetIdx}
              handleStyle={[{ height: 50, backgroundColor: '#eee', borderTopLeftRadius: 20, borderTopRightRadius: 20 }]}
            >
              <BottomSheetView>
                <View style={styles.spikView}>
                  <WebView source={{ uri: "https://www.google.com" }} />
                </View>
              </BottomSheetView>
            </BottomSheet>
            <View ref={bottomBarRef} style={styles.bottomBar}>
              <TouchBtn onPress={() => router.replace('/')} style={styles.wideBtn}>
                <Text style={styles.outBtn}>Keluar</Text>
              </TouchBtn>
              <TouchBtn onPress={() => handleReturnWeb()} style={[styles.normalBtn, styles.navBtn]}>
                <Ionicons style={[{ display: 'block', textAlign: 'center', }]} name="home-sharp" size={20} color="#000" />
              </TouchBtn>
              <TouchBtn onPress={() => handleGoBack()} style={[styles.normalBtn, styles.navBtn, { opacity: canGoBack ? 1 : .8}]}>
                <Ionicons style={[{ display: 'block', textAlign: 'center', }]} name="arrow-back" size={25} color="#000" />
              </TouchBtn>
              <TouchBtn onPress={() => handleRefresh()} style={[styles.normalBtn, styles.navBtn]}>
                <FontAwesome style={[{ display: 'block', textAlign: 'center', }]} name="repeat" size={20} color="#000" />
              </TouchBtn>
              <TouchBtn onPress={() => handleGoForward()} style={[styles.normalBtn, styles.navBtn, { opacity: canGoForward ? 1 : .8}]}>
                <Ionicons style={[{ display: 'block', textAlign: 'center', }]} name="arrow-forward" size={25} color="#000" />
              </TouchBtn>
              <Pressable onPress={() => handleBottomSheet()} style={[styles.wideBtn, styles.infoBtn]}>
                <View style={[{ display: 'flex', flexDirection: 'row', gap: 5, marginHorizontal: 'auto', }]}>
                  <Entypo name="bar-graph" size={12} color="white" />
                  <Text style={[{ color: 'white' }]}>
                    {Math.round(batteryLevel * 100)}
                  </Text>
                </View>
                <View style={styles.line}></View>
                <View style={[{ display: 'flex', flexDirection: 'row', gap: 5, marginHorizontal: 'auto', }]}>
                  <Ionicons name="battery-full" size={15} color="white" />
                  <Text style={[{ color: 'white' }]}>
                    10.57
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.box}>
            <Text style={styles.info}>Silahkan pin layar dengan menekan tombol di bawah</Text>
            <TouchBtn onPress={() => setIsOpenWeb(true)} style={styles.btnEnter}>
              <Text style={styles.textEnter}>Pin layar sekarang</Text>
            </TouchBtn>
          </View>
        )
      }
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: '100%',
  },
  box: {
    borderWidth: 1,
    borderColor: colors.RED,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    paddingVertical: 10,
    gap: 8,
  },
  info: {
    color: colors.RED,
    width: 450,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 300,
  },
  btnEnter: {
    backgroundColor: colors.PRIMARY,
    paddingBlock: 10,
    paddingHorizontal: 10,
    borderRadius: 7.5,
  },
  textEnter: {
    color: 'white',
  },
  webContainer: {
    width: '100%',
    height: '90%',
    height: Dimensions.get('window').height - StatusBar.currentHeight,
    marginTop: StatusBar.currentHeight - 15,
    top: 0,
    position: 'absolute',
  },
  bottomBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
    gap: 6,
    padding: 10,
    position: 'absolute',
    width: '100%',
    bottom: -StatusBar.currentHeight - 15, left: 0,
    backgroundColor: '#111',
  },
  wideBtn: {
    width: 70,
  },
  normalBtn: {
    width: 43,
  },
  outBtn: {
    color: colors.RED,
    fontSize: 13,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.RED,
    paddingBlock: 10,
  },
  infoBtn: {
    display: 'flex',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DDD',
    flexDirection: 'column',
  },
  navBtn: {
    display: 'flex',
    borderRadius: 5,
    flexDirection: 'column',
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spikView: {
    width: '100%',
    height: '100%',
  },
  line: {
    width: '100%',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    marginTop: 2,
  }
});

export default Result;
