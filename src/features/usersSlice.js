import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  signing: false,
  error: null,
  token: localStorage.getItem("token"),
};

export const registerUser = createAsyncThunk(
  "users/post",
  async (data, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/users/register`, {
        method: "POST",
        body: JSON.stringify({
          login: data.login,
          password: data.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk(
  "usersjnj/post",
  async (data, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/users/login`, {
        method: "POST",
        body: JSON.stringify({
          login: data.login,
          password: data.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.singing = false;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.singing = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(login.rejected, (state, action) => {});
  },
});

export default usersSlice.reducer;
