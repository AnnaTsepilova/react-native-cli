import React, { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet, View, ImageBackground } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useRoute } from "./router";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";

import Main from "./components/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const routing = useRoute(user);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <ImageBackground
            source={require("./assets/img/mainBg.jpg")}
            resizeMode="cover"
            style={styles.background}
          >
            {routing}
            <StatusBar style="auto" />
          </ImageBackground>
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
  },

  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
