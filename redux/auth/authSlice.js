import { createSlice } from "@reduxjs/toolkit";

import {
  signUp,
  signIn,
  isLoggedIn,
  logOut,
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
      });
    //   .addCase(isLoggedIn.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(isLoggedIn.fulfilled, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.isAuth = true;
    //     state.email = payload.email;
    //     state.nickname = payload.displayName;
    //     state.id = payload.id;
    //     state.avatar = payload.avatar;
    //   })
    //   .addCase(isLoggedIn.rejected, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.error = payload;
    //   })
    //   .addCase(logOut.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(logOut.fulfilled, (state) => {
    //     state.isLoading = false;
    //     state.isAuth = false;
    //     state.avatar = "";
    //     state.email = "";
    //     state.id = "";
    //     state.nickname = "";
    //   })
    //   .addCase(logOut.rejected, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.error = payload;
    //   })
    //   .addCase(changeAvatar.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(changeAvatar.fulfilled, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.avatar = payload.photoURL;
    //   })
    //   .addCase(changeAvatar.rejected, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.error = payload;
    //   })
  },
});

export const authReducer = authSlice.reducer;
