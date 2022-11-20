import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todosSlice";
import userReducer from "../features/usersSlice";

export const store = configureStore({
  reducer: { todosReducer, userReducer },
});
