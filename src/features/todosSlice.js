import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
      });
      return id;
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
        },
      });
      return act.id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const postTodos = createAsyncThunk(
  "todos/post",
  async (text, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/todos`, {
        method: "POST",
        body: JSON.stringify({
          bl: false,
          text: text,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return text;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const ad = createAction("ad");

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
          if (item._id === action.payload) {
            item.bl = !item.bl;
          }
          return item;
        });
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.todos = state.todos.filter((item) => {
          return item._id !== action.payload;
        });
      })
      .addCase(postTodos.fulfilled, (state, action) => {
        state.todos.unshift({ text: action.payload, bl: false });
      });
  },
});

export default todosSlice.reducer;
