import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import Home from "./screens/Home";

import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

export const useRoute = (Auth) => {
  if (!Auth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Home"
          component={Home}
          options={{ title: "Start screen", headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingRight: 70,
          paddingLeft: 70,
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
            lineHeight: 22,
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
            fontFamily: "RobotoMedium",
            fontSize: 17,
            lineHeight: 22,
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
            lineHeight: 22,
            color: "#212121",
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTabs.Navigator>
  );
};
