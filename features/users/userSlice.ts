import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserEntity } from "./UserEntity";
import { UsersAPI } from "./usersAPI";

export const signUp = createAsyncThunk(
  "user/auth/signup",
  async (user: UserEntity, thunkAPI) => {
    const response = UsersAPI.signup(user);
    return response;
  }
);

interface UsersState {
  entities: UserEntity[];
}

const initialState = {
  entities: [],
} as UsersState;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.entities = action.payload;
    });
  },
});

export default usersSlice.reducer;
