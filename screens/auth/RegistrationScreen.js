import React, { useState } from "react";

import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Platform,
  Image,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { pickImage } from "../../helpers/pickImage";

import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/auth/authOperations";
import { selectIsLoading } from "../../redux/auth/authSelectors";

const initialState = {
  nickname: "",
  email: "",
  password: "",
  avatar: null,
};

export default function RegistrationScreen({ navigation }) {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [image, setImage] = useState(null);
  const [state, setState] = useState(initialState);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = (data) => {
    console.log("submit RegistrationScreen", state);
    data.avatar = image;
    console.log("image avatar", image);
    dispatch(signUp(state));
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
            ios: -170,
            android: -100,
          })}
        >
          <View
            style={{
              ...styles.formContainer,
              //width: dimensions,
              //marginBottom: isShownKeyboard ? 0 : 0,
            }}
          >
            <View style={styles.avatarContainer}>
              {image && <Image source={{ uri: image }} style={styles.avatar} />}
              <TouchableOpacity
                style={styles.icon}
                onPress={() => pickImage(setImage)}
              >
                <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
              </TouchableOpacity>
            </View>
            <Text style={styles.formTitle}>Registration</Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Login"
                placeholderTextColor="#BDBDBD"
                value={state.nickname}
                onFocus={() => setIsShownKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, nickname: value }))
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
                  <Text style={styles.btnTitle}>SIGN UP</Text>
                </TouchableOpacity>
              )}
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
    position: "relative",
    marginTop: -60,
    width: 120,
    height: 120,

    alignSelf: "center",

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 16,
  },

  icon: {
    position: "absolute",
    bottom: 16,
    right: -12,
    borderRadius: 50,
    backgroundColor: "#fff",
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
