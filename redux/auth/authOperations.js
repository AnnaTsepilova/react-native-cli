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

      //console.log("auth.currentUser from signUp operations", auth.currentUser);

      const url =
        data.avatar && (await uploadPhoto(data.avatar, "avatars", uid));

      await updateProfile(auth.currentUser, {
        displayName: data.nickname,
        photoURL: url,
      });
      const { email, displayName, photoURL } = auth.currentUser;

      return { uid, email, displayName, photoURL };
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
      const { uid, email, displayName, photoURL } = auth.currentUser;
      console.log("auth.currentUser from signIn", auth.currentUser);
      return { uid, email, displayName, photoURL };
    } catch (error) {
      return thunkAPI.rejectWithValue("error.message", error.message);
    }
  }
);

export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue("error.message", error.message);
    }
  }
);

export const isLoggedIn = createAsyncThunk(
  "auth/isLoggedIn",
  async (_, thunkAPI) => {
    try {
      await onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed:", user);

        if (user) {
          id = user.uid;
          email = user.email;
          displayName = user.displayName;
          avatar = user.photoURL;
        }
      });

      if (!email) {
        return thunkAPI.rejectWithValue("error.message", error.message);
      }

      return { displayName, email, avatar, id };
    } catch (error) {
      return thunkAPI.rejectWithValue("error.message", error.message);
    }
  }
);
