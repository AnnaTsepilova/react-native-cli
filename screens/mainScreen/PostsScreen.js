import React from "react";

import { TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import NestedPosts from "../nestedScreens/NestedPosts";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="NestedPosts"
        component={NestedPosts}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
            fontFamily: "Roboto - medium",
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
            lineHeight: 22,
            color: "#212121",
            fontFamily: "Roboto - medium",
          },
        }}
      />
    </NestedScreen.Navigator>
  );
}
