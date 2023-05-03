import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import {
  collection,
  onSnapshot,
  query,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const NestedPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const q = query(collection(db, "posts"));

    onSnapshot(q, async (querySnapshot) => {
      const posts = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const coll = collection(db, `posts/${doc.id}/comments`);
          const snapshot = await getCountFromServer(coll);

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
    getAllPosts();
  }, []);
  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View>
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
                    navigation.navigate(
                      "Comments"
                      //   , {
                      //   postId: item.postId,
                      //   uri: item.photo,
                      // }
                    )
                  }
                >
                  <EvilIcons
                    name="comment"
                    size={30}
                    color="#BDBDBD"
                    style={{ marginBottom: 6 }}
                  />
                  {/* <Text style={styles.count}>{item.commentCount}</Text> */}
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Map", { location: item.location })
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
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 32,
    paddingHorizontal: 16,

    backgroundColor: "#FFF",
  },
  postContainer: { marginBottom: 34 },
  photo: {
    marginBottom: 8,
    width: "100%",
    height: 240,

    overflow: "hidden",
    objectFit: "cover",

    borderRadius: 8,
  },
  title: {
    marginBottom: 11,
    fontFamily: "RobotoMedium",
    fontSize: 16,
    color: "#212121",
  },
  place: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default NestedPosts;
