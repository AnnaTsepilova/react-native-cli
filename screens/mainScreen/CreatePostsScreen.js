import React, { useEffect, useState } from "react";
//import * as Crypto from "expo-crypto";
import { nanoid } from "nanoid";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Camera } from "expo-camera";

import { db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";

import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
  const { id, email, nickname, avatar } = useSelector(selectUser);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [error, setError] = useState("");

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");

      let loc = await Location.requestForegroundPermissionsAsync();
      if (loc.status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();

    setPhoto(photo.uri);
    console.log("photo", photo);
    const location = await Location.getCurrentPositionAsync();
    setLocation(location);
    console.log("location", location);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const photoId = nanoid();
    const imagesRef = ref(storage, `postImages/${photoId}`);

    await uploadBytesResumable(imagesRef, file);
    const url = await getDownloadURL(imagesRef);

    return url;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    try {
      await addDoc(collection(db, "posts"), {
        photo,
        title,
        place,
        location: location.coords,
        id,
        email,
        nickname,
        avatar,
      });
    } catch (error) {
      setError("Error uploading post: ", error.message);
    }
  };

  const onSubmit = async () => {
    await uploadPostToServer();
    navigation.navigate("Posts");
    setPhoto("");
    setTitle("");
    setPlace("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
          <View style={styles.cameraContainer}>
            <Camera style={styles.camera} ref={setCamera}>
              {photo && (
                <View style={styles.takePhotoContainer}>
                  <Image style={styles.camera} source={{ uri: photo }} />
                </View>
              )}
              <TouchableOpacity
                style={styles.photoBtnContainer}
                activeOpacity={0.8}
                onPress={takePhoto}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={24}
                  color={"#BDBDBD"}
                />
              </TouchableOpacity>
            </Camera>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Title..."
            placeholderTextColor="#BDBDBD"
            onFocus={() => setIsShownKeyboard(true)}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <View style={{ position: "relative" }}>
            <Ionicons
              name="location-outline"
              size={24}
              color="#BDBDBD"
              style={styles.locationIcon}
            />
            <TextInput
              style={{ ...styles.input, paddingLeft: 28 }}
              placeholder="Location..."
              placeholderTextColor="#BDBDBD"
              onFocus={() => setIsShownKeyboard(true)}
              value={place}
              onChangeText={(text) => setPlace(text)}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.createBtn} onPress={onSubmit}>
              <Text style={styles.createBtnText}>Create post</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 32,
    paddingBottom: 34,
    paddingLeft: 16,
    paddingRight: 16,

    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
  },
  cameraContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    // backgroundColor: "#F6F6F6",
    backgroundColor: "#000",
    marginBottom: 32,
    overflow: "hidden",
  },

  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    objectFit: "cover",

    justifyContent: "center",
    alignItems: "center",
  },

  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,

    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },

  photoBtnContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  snap: {
    color: "#fff",
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",

    marginTop: 20,
    marginHorizontal: 30,
    height: 40,

    borderWidth: 2,
    borderColor: "green",
    borderRadius: 10,
  },
  sendLabel: { color: "green", fontSize: 20 },
  input: {
    marginBottom: 32,
    paddingBottom: 15,

    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",

    fontFamily: "RobotoMedium",
    fontSize: 16,
    color: "#212121",
  },
  locationIcon: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: -3,
      },
      android: {
        top: 3,
      },
    }),
  },
  createBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
  },
  createBtnText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: "#BDBDBD",
    textAlign: "center",
  },
});

export default CreatePostsScreen;
