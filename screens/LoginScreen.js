import React, { useEffect, useState, useCallback } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

const loadFonts = async () => {
  await Font.loadAsync({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
  });
};

export default function LoginScreen() {
  const [state, setState] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        source={require("../assets/img/mainBg.jpg")}
        resizeMode="cover"
        style={styles.background}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.formContainer,
              //width: dimensions,
              //marginBottom: isShownKeyboard ? 0 : 0,
            }}
          >
            <View style={styles.avatarContainer}></View>
            <Text style={styles.formTitle}>Sign In</Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#BDBDBD"
                value={state.email}
                onFocus={() => setIsShownKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#BDBDBD"
                value={state.password}
                secureTextEntry={true}
                onFocus={() => setIsShownKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.signUp}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },

  formContainer: {
    paddingBottom: 78,
    paddingHorizontal: 16,

    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },

  avatarContainer: {
    marginTop: -60,
    alignSelf: "center",
    width: 120,
    height: 120,

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  form: {
    gap: 16,
  },

  formTitle: {
    marginTop: 32,
    marginBottom: 32,

    fontFamily: "RobotoMedium",
    fontSize: 30,
    color: "#212121",
    letterSpacing: 0.01,
    textAlign: "center",
  },

  input: {
    padding: 16,
    height: 50,
    backgroundColor: "#F6F6F6",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,

    fontFamily: "RobotoRegular",
    color: "#212121",
    fontSize: 16,
    lineHeight: 1.18,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",

    marginTop: 27,
    padding: 16,
    minHeight: 51,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  btnTitle: {
    fontFamily: "RobotoRegular",
    color: "#ffffff",
    fontSize: 16,
  },

  signUp: {
    fontFamily: "RobotoRegular",
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
  },
});
