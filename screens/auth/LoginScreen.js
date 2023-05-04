import React, { useState } from "react";

import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Platform,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/auth/authOperations";
import { selectIsLoading } from "../../redux/auth/authSelectors";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log("submit LoginScreen", state);
    dispatch(signIn(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        source={require("../../assets/img/mainBg.jpg")}
        resizeMode="cover"
        style={styles.background}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.select({
            ios: -230,
            android: -40,
          })}
        >
          <View
            style={{
              ...styles.formContainer,
              //width: dimensions,
              //marginBottom: isShownKeyboard ? 0 : 0,
            }}
          >
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
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color="#FF6C00"
                  style={{ marginTop: 27, marginBottom: 16 }}
                />
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={onSubmit}
                >
                  <Text style={styles.btnTitle}>SIGN IN</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.signUp}>
                  {" "}
                  New to application?
                  <Text style={styles.signUp}> Sign Up</Text>
                </Text>
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
