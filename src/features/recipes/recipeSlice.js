import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recipesApi from "../recipesApi";
require("dotenv").config();

const recipeDetailsFetchParams = {
  params: {
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
    includeNutrition: false,
  },
};

const similarRecipesFetchParams = {
  params: {
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
    number: 20,
    limitLicense: true,
  },
};

export const fetchAsyncRecipes = createAsyncThunk(
  "recipes/fetchAsyncRecipes",
  async (params) => {
    const response = await recipesApi.get(`/recipes/complexSearch`, params);
    return response.data;
  }
);

export const fetchAsyncRecipesToBePush = createAsyncThunk(
  "recipes/fetchAsyncRecipesToBePush",
  async (params) => {
    const response = await recipesApi.get(`/recipes/complexSearch`, params);
    return response.data;
  }
);

export const fetchAsyncRecipesDetails = createAsyncThunk(
  "recipes/fetchAsyncRecipesDetails",
  async (recipeId) => {
    const response = await recipesApi.get(
      `/recipes/${recipeId}/information`,
      recipeDetailsFetchParams
    );
    return response.data;
  }
);

export const fetchAsyncSimilarRecipes = createAsyncThunk(
  "recipes/fetchAsyncSimilarRecipes",
  async (recipeId) => {
    const response = await recipesApi.get(
      `/recipes/${recipeId}/similar`,
      similarRecipesFetchParams
    );
    return response.data;
  }
);

export const fetchAsyncAutocompleteData = createAsyncThunk(
  "recipes/fetchAsyncAutocompleteData",
  async (params) => {
    const response = await recipesApi.get(`/recipes/autocomplete`, params);
    return response.data;
  }
);

const initialState = {
  recipes: {},
  recipesToBePush: {},
  recipeDetails: {},
  similarRecipes: [],
  autocompleteData: [],

  searchKey: "",
  recipesFetchStatus: "",
  recipesToBePushFetchStatus: "",
  recipeDetailsFetchStatus: "",
  similarRecipesFetchStatus: "",
  autocompleteDataFetchStatus: "",
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    removeSelectedRecipe: (state) => {
      state.selectedRecipe = {};
    },
    setSearchKey: (state, { payload }) => {
      state.searchKey = payload;
    },
    pushNewRecipes: (state) => {
      const merge = state.recipes.results.concat(state.recipesToBePush.results);
      state.recipes.results = merge;
    },
  },
  extraReducers: {
    [fetchAsyncRecipes.pending]: (state, action) => {
      return { ...state, recipesFetchStatus: "loading" };
    },
    [fetchAsyncRecipes.fulfilled]: (state, { payload }) => {
      return { ...state, recipes: payload, recipesFetchStatus: "success" };
    },
    [fetchAsyncRecipes.rejected]: (state, action) => {
      return { ...state, recipesFetchStatus: "failed" };
    },
    //-----
    [fetchAsyncRecipesToBePush.pending]: (state, action) => {
      return { ...state, recipesToBePushFetchStatus: "loading" };
    },
    [fetchAsyncRecipesToBePush.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        recipesToBePush: payload,
        recipesToBePushFetchStatus: "success",
      };
    },
    [fetchAsyncRecipesToBePush.rejected]: (state, action) => {
      return { ...state, recipesToBePushFetchStatus: "failed" };
    },
    //-----
    [fetchAsyncRecipesDetails.pending]: (state, action) => {
      return { ...state, recipeDetailsFetchStatus: "loading" };
    },
    [fetchAsyncRecipesDetails.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        recipeDetails: payload,
        recipeDetailsFetchStatus: "success",
      };
    },
    [fetchAsyncRecipesDetails.rejected]: (state, action) => {
      return { ...state, recipeDetailsFetchStatus: "failed" };
    },
    //-----

    [fetchAsyncSimilarRecipes.pending]: (state, action) => {
      return { ...state, similarRecipesFetchStatus: "loading" };
    },
    [fetchAsyncSimilarRecipes.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        similarRecipes: payload,
        similarRecipesFetchStatus: "success",
      };
    },
    [fetchAsyncSimilarRecipes.rejected]: (state, action) => {
      return { ...state, similarRecipesFetchStatus: "failed" };
    },
    //-----

    [fetchAsyncAutocompleteData.pending]: (state, action) => {
      return { ...state, autocompleteDataFetchStatus: "loading" };
    },
    [fetchAsyncAutocompleteData.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        autocompleteData: payload,
        autocompleteDataFetchStatus: "success",
      };
    },
    [fetchAsyncAutocompleteData.rejected]: (state, action) => {
      return { ...state, autocompleteDataFetchStatus: "failed" };
    },
  },
});

export const { removeSelectedRecipe, setSearchKey, pushNewRecipes } =
  recipesSlice.actions;
//---
export const getRecipes = (state) => state.recipes.recipes;
export const getRecipesFetchStatus = (state) =>
  state.recipes.recipesFetchStatus;
//---
export const getRecipesToBePush = (state) => state.recipes.recipesToBePush;
export const getRecipesToBePushFetchStatus = (state) =>
  state.recipes.recipesToBePushFetchStatus;
//---
export const getRecipeDetails = (state) => state.recipes.recipeDetails;
export const getRecipeDetailsFetchStatus = (state) =>
  state.recipes.recipeDetailsFetchStatus;
//---
export const getSimilarRecipes = (state) => state.recipes.similarRecipes;
export const getSimilarRecipesFetchStatus = (state) =>
  state.recipes.similarRecipesFetchStatus;
//---
export const getAutocompleteData = (state) => state.recipes.autocompleteData;
export const getAutocompleteDataFetchStatus = (state) =>
  state.recipes.autocompleteDataFetchStatus;
//---
export const getSearchKey = (state) => state.recipes.searchKey;
//---
export default recipesSlice.reducer;
