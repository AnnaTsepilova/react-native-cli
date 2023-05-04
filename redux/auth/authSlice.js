import { createSlice } from "@reduxjs/toolkit";

import {
  signUp,
  signIn,
  isLoggedIn,
  signOutUser,
  changeAvatar,
} from "./authOperations";

const initialState = {
  id: "",
  email: "",
  nickname: "",
  avatar: "",
  isAuth: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUser: (state, action) => {
      state.isLoading = false;
      state.id = action.payload.uid;
      state.email = action.payload.email;
      state.nickname = action.payload.displayName;
      state.avatar = action.payload.photoURL;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.uid;
        state.email = action.payload.email;
        state.nickname = action.payload.displayName;
        state.avatar = action.payload.photoURL;
        state.isAuth = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.id = action.payload.uid;
        state.email = action.payload.email;
        state.nickname = action.payload.displayName;
        state.avatar = action.payload.photoURL;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.avatar = null;
        state.email = null;
        state.id = null;
        state.nickname = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(isLoggedIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.email = action.payload.email;
        state.nickname = action.payload.displayName;
        state.id = action.payload.id;
        state.avatar = action.payload.avatar;
      })
      .addCase(isLoggedIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(changeAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatar = action.payload.photoURL;
      })
      .addCase(changeAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { getCurrentUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
