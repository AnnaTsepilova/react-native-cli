import React from "react";
import { useDispatch } from "react-redux";

import { TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import NestedPosts from "../nestedScreens/NestedPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

import { signOutUser } from "../../redux/auth/authOperations";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  const dispatch = useDispatch();

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Posts"
        component={NestedPosts}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="appstore-o"
              size={24}
              color={focused ? "#ffffff" : "#BDBDBD"}
            />
          ),

          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              activeOpacity={0.8}
              onPress={() => dispatch(signOutUser())}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "RobotoMedium",
            fontSize: 17,
            color: "#212121",
          },
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            color: "#212121",
            fontFamily: "RobotoMedium",
          },
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            color: "#212121",
            fontFamily: "RobotoMedium",
          },
        }}
      />
    </NestedScreen.Navigator>
  );
}
