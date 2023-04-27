import React, { useEffect, useState, useCallback } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
//import * as SplashScreen from "expo-splash-screen";

//import DocumentPicker from "react-native-document-picker";

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
  name: "",
  email: "",
  password: "",
};

//SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
  });
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Pre-load fonts, make any API calls you need to do here
  //       await Font.loadAsync({
  //         RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  //         RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
  //       });
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setIsReady(true);
  //     }
  //   }
  //   prepare();
  // }, []);

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width - 16 * 2;
  //     setDimensions(width);
  //   };

  //   Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     Dimensions.removeEventListener("change", onChange);
  //   };
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (isReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [isReady]);

  // if (!isReady) {
  //   return null;
  // }

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
    // <View
    // onLayout={onLayoutRootView}
    // >
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
            <Text style={styles.formTitle}>Registration</Text>

            <View style={styles.form}>
              {/* name */}
              <TextInput
                style={styles.input}
                placeholder="Login"
                placeholderTextColor="#BDBDBD"
                value={state.name}
                onFocus={() => setIsShownKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, name: value }))
                }
              />
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
                <Text style={styles.btnTitle}>SIGN UP</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.signIn}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
    // </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    //alignItems: "center",
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

  signIn: {
    fontFamily: "RobotoRegular",
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
  },
});
