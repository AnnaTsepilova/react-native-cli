import React, { useState } from "react";

//import DocumentPicker from "react-native-document-picker";
//import { useFonts } from "expo-font";
//import AppLoading from "expo-app-loading";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  //TextInput,
  //TouchableOpacity,
  //Platform,
  //KeyboardAvoidingView,
  //Keyboard,
  //TouchableWithoutFeedback,
} from "react-native";

export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/img/mainBg.jpg")}
      >
        {/* <View style={styles.registerForm}></View> */}
        {/* <Text>hi</Text> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  registerForm: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
});
