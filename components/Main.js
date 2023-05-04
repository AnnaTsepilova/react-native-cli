import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../router";

import { isLoggedIn } from "../redux/auth/authOperations";
import { selectIsAuth, selectEmail } from "../redux/auth/authSelectors";

export default function Main() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const email = useSelector(selectEmail);

  useEffect(() => {
    dispatch(isLoggedIn());
    console.log("email selectEmail in Main", email);
  }, []);

  const routing = useRoute(isAuth);

  return (
    <NavigationContainer>
      {routing}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
