import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import RegistrationScreen from "./screenss/RegistrationScreen";
//import LoginScreen from "./screens/LoginScreen.js";
//import LoginScreen from "./screens/LoginScreen.js";

export default function App() {
  return (
    <View style={styles.container}>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
