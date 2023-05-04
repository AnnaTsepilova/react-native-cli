import React from "react";
import { View, Text, StyleSheet } from "react-native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";

import PostsScreen from "./mainScreen/PostsScreen";
import CreatePostsScreen from "./mainScreen/CreatePostsScreen";
import ProfileScreen from "./mainScreen/ProfileScreen";

const MainTabs = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <MainTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingRight: 70,
          paddingLeft: 70,
          //borderTopColor:
        },
        tabBarItemStyle: {
          width: 70,
          height: 40,
          borderRadius: 20,
        },

        tabBarActiveBackgroundColor: "#FF6C00",
      }}
      backBehavior="history"
    >
      <MainTabs.Screen
        options={{
          //headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="appstore-o"
              size={24}
              color={focused ? "#ffffff" : "#BDBDBD"}
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }} activeOpacity={0.8}>
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
        name="Posts"
        component={PostsScreen}
      />
      <MainTabs.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="plus"
              size={focused ? 18 : 24}
              color={focused ? "#ffffff" : "#BDBDBD"}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 20 }}>
              <Ionicons name="arrow-back" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            // marginBottom: 11,
            fontFamily: "RobotoMedium",
            fontSize: 17,
            color: "#212121",
          },
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTabs.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? "#ffffff" : "#BDBDBD"}
            />
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "RobotoMedium",
            fontSize: 17,
            color: "#212121",
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
