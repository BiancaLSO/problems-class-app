import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserEntity } from "./UserEntity";
import { UsersAPI } from "./usersAPI";
import * as SecureStore from "expo-secure-store";

export const signUp = createAsyncThunk(
  "user/auth/signup",
  async (user: UserEntity, thunkAPI) => {
    const response = UsersAPI.signup(user);
    return response;
  }
);

export const login = createAsyncThunk(
  "user/auth/login",
  async (user: UserEntity, thunkAPI) => {
    const response = await UsersAPI.login(user);
    console.log(response.access_token);

    //Save token to Secure Store
    SecureStore.setItemAsync("token", response.access_token);
    return response;
  }
);

interface UsersState {
  entities: UserEntity[];
  // userToken: { access_token: string } | null | undefined;
  userToken: string | undefined | null;
  error: string | undefined;
}

const initialState = {
  entities: [],
  userToken: undefined,
  error: undefined,
} as UsersState;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string | null>) => {
      state.userToken = action.payload;
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log("running signup fulfilled");
      state.error = undefined;
      if (action.payload.id != undefined) {
        state.error = "Signup success";
      }
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("running login fulfilled");
      state.error = undefined;
      state.userToken = action.payload?.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.error.message === "Request failed with status code 401") {
        state.error = "Invalid login";
        state.userToken = undefined;
      }

      console.log("error in slice", action.error);
    });
  },
});

export const { updateToken } = usersSlice.actions;

export default usersSlice.reducer;
