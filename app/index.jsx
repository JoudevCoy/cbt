import { View, Modal, Text, Image, Alert, Button, StyleSheet, SafeAreaView, Pressable, TextInput } from 'react-native';
import React from 'react';
import { Stack, Link, useRouter } from 'expo-router';
import { colors } from "@/components/Colors.js";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

import bgImg from '@/assets/bg.jpg';

export default function Home() {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const [urlVal, setUrlVal] = React.useState("");

  const closeModal = () => setOpenModal(false);

  const handleNavUrl = (url) => {
    if (!url) {
      return Alert.alert("URL tidak boleh kosong!");
    }
    setOpenModal(false);
    setTimeout(() => {
      router.push({ pathname: "/result", params: { url } });
    }, 500);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Stack.Screen />
        <Image style={styles.bg} source={bgImg} />

        {/* Modal */}
        <Modal
          visible={openModal}
          transparent={true}
          animationType="fade"
          statusBarTranslucent={true}>
          <View style={styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFillObject, { backgroundColor: "#00000060" }]} onPress={() => setOpenModal(false)}></Pressable>

            <View style={styles.modalBox}>
              <Pressable onPress={() => closeModal}><Text style={styles.cancelModal}>×</Text></Pressable>
              <Text style={styles.modalTitle}>Masukan alamat server</Text>
              <TextInput
                style={styles.urlInput}
                onChangeText={setUrlVal}
                value={urlVal}
                placeholder="Masukan URL"
              />
              <Pressable onPress={() => handleNavUrl(urlVal)}>
                <Text style={styles.modalBtn}>MASUK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.box} >
          <View style={styles.hero}>
            <Image style={styles.heroImg} source={require('@/assets/icon.png')} />
            <Text style={styles.heroText}>CBT Exam Browser</Text>
            <Text>v 5.0</Text>
          </View>

          <Pressable onPress={() => setOpenModal(true)}>
            <Text style={styles.btn}>Masukan URL</Text>
          </Pressable>
          <Pressable onPress={() => { router.push({ pathname: "/scan" }) }}>
            <Text style={styles.btn}>Scan Kode QR</Text>
          </Pressable>

          <View style={styles.action}>
            <View style={styles.actionBtn}>
              <View>
                <View style={[{ backgroundColor: 'white', width: 60, borderRadius: 10, aspectRatio: 1, display: 'flex', justifyContent: 'center' }]}>
                  <Image style={[{ width: '100%', height: '100%', transform: [{ scale: .7 }],}]} source={require('@/assets/baseline-sync-lock.png')}/>
                </View>
                <Text style={[{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 3, }]}>Useragent</Text>
              </View>
            </View>
            <View style={styles.actionBtn}>
              <View>
                <View style={[{ backgroundColor: 'white', width: 60, borderRadius: 10, aspectRatio: 1, display: 'flex', justifyContent: 'center' }]}>
                  <Ionicons style={[{ textAlign: 'center' }]} name="share-social" size={34} color="#222" />
                </View>
                <Text style={[{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 3, }]}>Share</Text>
              </View>
            </View>
            <View style={styles.actionBtn}>
              <View>
                <View style={[{ backgroundColor: 'white', width: 60, borderRadius: 10, aspectRatio: 1, display: 'flex', justifyContent: 'center' }]}>
                  <Entypo style={[{ textAlign: 'center' }]} name="star" size={33} color="#222" />
                </View>
                <Text style={[{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 3, }]}>Rate Us</Text>
              </View>
            </View>
            <View style={styles.actionBtn}>
              <View>
                <View style={[{ backgroundColor: 'white', width: 60, borderRadius: 10, aspectRatio: 1, display: 'flex', justifyContent: 'center' }]}>
                  <FontAwesome style={[{ textAlign: 'center' }]} name="bug" size={33} color="#222" />
                </View>
                <Text style={[{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 3, }]}>Lapor</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    position: 'absolute',
    top: "0",
    left: "0",
    zIndex: -1,
  },
  box: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 11,
    alignItems: 'center',
  },
  btn: {
    fontSize: 17,
    paddingBlock: 15,
    backgroundColor: 'white',
    textAlign: 'center',
    maxWidth: 450,
    width: '100%',
    borderRadius: 100,
    fontWeight: 'bold',
  },
  hero: {
    display: 'flex',
    maxWidth: 450,
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroImg: {
    width: 100,
    height: 100,
    objectFit: 'contain',
    margin: 10,
  },
  heroText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    gap: 10,
    backgroundColor: 'white',
    minWidth: 315,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  modalTitle: {
    paddingTop: 15,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 700,
    color: colors.PRIMARY,
    textAlign: 'center',
  },
  urlInput: {
    width: 315 - 10,
    marginHorizontal: 'auto',
    fontSize: 16,
    flex: 1,
    maxHeight: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
  },
  modalBtn: {
    textAlign: 'center',
    backgroundColor: colors.PRIMARY,
    color: 'white',
    fontSize: 16,
    fontWeight: 700,
    padding: 16,
  },
  cancelModal: {
    position: 'absolute',
    fontSize: 40,
    top: 10, right: 0,
    paddingHorizontal: 15,
    fontWeight: 600,
    color: 'gray',
    zIndex: 10,
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 30,
  },
});