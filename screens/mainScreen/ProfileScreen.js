import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";

import {
  collection,
  getCountFromServer,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { pickImage } from "../../helpers/pickImage";

import { selectUser } from "./../../redux/auth/authSelectors";
import { changeAvatar, signOutUser } from "../../redux/auth/authOperations";
import { db } from "../../firebase/config";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const { id, avatar, nickname } = useSelector(selectUser);

  const [posts, setPosts] = useState([]);
  const [photo, setPhoto] = useState("");

  const getPosts = async () => {
    const postsRef = collection(db, "posts");

    const q = query(postsRef, where("id", "==", id));

    onSnapshot(q, async (querySnapshot) => {
      const posts = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const coll = collection(db, `posts/${doc.id}/comments`);
          const snapshot = await getCountFromServer(coll);
          console.log("ProfileScreen", posts);
          return {
            ...doc.data(),
            postId: doc.id,
            commentCount: snapshot.data().count,
          };
        })
      );

      setPosts(posts);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const newAvatar = async () => {
    await pickImage(setPhoto);
    dispatch(changeAvatar(photo));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/mainBg.jpg")}
        style={styles.image}
      >
        <View style={styles.profileContainer}>
          <View style={{ marginBottom: 40 }}>
            <View style={styles.imgContainer}>
              {avatar && (
                <Image style={styles.avatar} source={{ uri: avatar }} />
              )}
              <TouchableOpacity style={styles.icon} onPress={newAvatar}>
                <MaterialIcons name="close" size={20} color="#E8E8E8" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => dispatch(signOutUser())}
              style={{ marginLeft: "auto", marginTop: -40 }}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{nickname}</Text>
          {posts && (
            <FlatList
              data={posts}
              keyExtractor={(item) => item.postId}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 34 }}>
                  <Image style={styles.photo} source={{ uri: item.photo }} />
                  <Text style={styles.title}>{item.title}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item.postId,
                          uri: item.photo,
                        })
                      }
                    >
                      <EvilIcons
                        name="comment"
                        size={30}
                        color="#BDBDBD"
                        style={styles.commentIcon}
                      />
                      <Text style={styles.count}>{item.commentCount}</Text>
                    </TouchableOpacity>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Map", {
                            location: item.location,
                          })
                        }
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Ionicons
                          name="location-outline"
                          size={24}
                          color="#BDBDBD"
                        />
                        <Text style={styles.place}>{item.place}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    paddingTop: 300,
  },
  profileContainer: {
    overflow: "visible",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    paddingLeft: 16,
    paddingRight: 16,
  },
  imgContainer: {
    position: "relative",
    width: 120,
    height: 120,
    marginTop: -60,
    marginLeft: "auto",
    marginRight: "auto",
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
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    position: "absolute",
    bottom: 16,
    right: -12,
  },
  name: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",

    marginBottom: 32,
  },
  photo: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    objectFit: "cover",
    marginBottom: 8,
  },
  title: {
    fontFamily: "RobotoMedium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 11,
  },
  place: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
  count: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentIcon: {
    ...Platform.select({
      android: {
        marginBottom: 6,
      },
    }),
  },
});
