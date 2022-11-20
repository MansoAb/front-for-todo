import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3001/todos");
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/delete",
  async (act, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/todos/${act.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${act.token}`,
        },
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const patchTodos = createAsyncThunk(
  "todos/patch",
  async (act, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/todos/${act.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          bl: !act.bl,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${act.token}`,
        },
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const postTodos = createAsyncThunk(
  "todos/post",
  async (act, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/todos`, {
        method: "POST",
        body: JSON.stringify({
          bl: false,
          text: act.text,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${act.token}`,
        },
      });
      return res.json("jb");
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = true;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(patchTodos.fulfilled, (state, action) => {
        state.todos = state.todos.map((item) => {
          if (item._id === action.payload._id) {
            item.bl = !item.bl;
          }
          return item;
        });
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.todos = state.todos.filter((item) => {
          return item._id !== action.payload._id;
        });
      })
      .addCase(postTodos.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      });
  },
});

export default todosSlice.reducer;
