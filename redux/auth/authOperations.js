import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data, thunkAPI) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const { uid } = auth.currentUser;

      console.log("auth.currentUser from signUp operations", auth.currentUser);

      // const url = data.avatar && (await uploadPhoto(data.avatar, "avatars", uid));

      // await updateProfile(auth.currentUser, {
      //   displayName: data.nickname,
      //   photoURL: url,
      // });
      const { email, displayName, photoURL } = auth.currentUser;

      return { email, displayName, uid, photoURL };
    } catch (error) {
      return thunkAPI.rejectWithValue("error.message", error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      const { email, displayName, uid, photoURL } = auth.currentUser;
      console.log("auth.currentUser", auth.currentUser);
      return { email, displayName, uid, photoURL };
    } catch (error) {
      return thunkAPI.rejectWithValue("error.message", error.message);
    }
  }
);
