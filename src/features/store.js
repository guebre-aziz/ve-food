import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipes/recipeSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});
