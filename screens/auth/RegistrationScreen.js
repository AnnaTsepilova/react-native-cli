import React, { useEffect, useState, useCallback } from "react";

import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const onSubmit = () => {
    console.log("Form Data:", state);
    setState(initialState);
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
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
              // onPress={keyboardHide}
              // onPress={() => handleSubmit(navigation.navigate("Home"))}
              // onPress={handleSubmit}
              onPress={onSubmit}
            >
              <Text style={styles.btnTitle}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.signIn}>
                Have an account?
                <Text style={styles.signIn}> Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
