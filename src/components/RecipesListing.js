import React, { useState, useEffect } from "react";
// Components & data
import RecipeCard from "../components/RecipeCard";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import {
  fetchAsyncRecipes,
  getRecipes,
  getRecipesFetchStatus,
  fetchAsyncRecipesToBePush,
  getRecipesToBePushFetchStatus,
  pushNewRecipes,
  getSearchKey,
} from "../features/recipes/recipeSlice";
// Packages components
import { useDispatch, useSelector } from "react-redux";
// MUI
import { styled, alpha } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from "@mui/material";
require("dotenv").config();

const RecipesListingContainer = styled("div")(({ theme }) => ({
  width: theme.spacing("80%"),
  minHeight: "100vh",
  margin: "auto",
  padding: theme.spacing(5),
  paddingTop: theme.spacing(12),
  backgroundColor: "white",
}));

const FormControlContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.secondary.main, 0.5),
}));

export default function RecipesListing() {
  const dispatch = useDispatch();
  const [vegetarianAndVeganFilter, setVegetarianAndVeganFilter] =
    useState(true);
  const [onlyVeganFilter, setOnlyVeganFilter] = useState(false);
  const [orderBy, setOrderBy] = useState("");
  const [fetchOffset, setFetchOffset] = useState(0);
  const searchKey = useSelector(getSearchKey);
  const recipesFetchParams = {
    params: {
      query: searchKey,
      number: 20,
      offset: fetchOffset,
      apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
      diet: "vegetarian, vegan",
      instructionsRequired: true,
      fillIngredients: true,
      addRecipeInformation: true,
      addRecipeNutrition: false,
      tags: "vegetarian, vegan",
      ignorePantry: false,
    },
  };
  const handleVegetarianAndVeganFilter = () => {
    setVegetarianAndVeganFilter(!vegetarianAndVeganFilter);
    if (!vegetarianAndVeganFilter) {
      setOnlyVeganFilter(false);
    } else {
      setOnlyVeganFilter(true);
    }
  };
  const handleOnlyVeganFilter = () => {
    setOnlyVeganFilter(!onlyVeganFilter);
    if (!onlyVeganFilter) {
      setVegetarianAndVeganFilter(false);
    } else {
      setVegetarianAndVeganFilter(true);
    }
  };

  const handleOrderBy = (e) => {
    setOrderBy(e.target.value);
  };

  const veganFilter = (data, checker) => {
    if (!Array.isArray(data)) return;
    if (checker) {
      return data.filter((data) => data.vegan === true);
    }
    return data;
  };

  const orderFilter = (data, orderValue) => {
    if (!Array.isArray(data)) return;
    if (orderValue) {
      if (orderValue === "spoonacularScore") {
        let newData = data.slice().sort((a, b) => {
          return b[orderValue] - a[orderValue];
        });
        return newData;
      } else if (orderValue === "readyInMinutes") {
        let newData = data.slice().sort((a, b) => {
          return a[orderValue] - b[orderValue];
        });
        return newData;
      } else return data;
    } else return data;
  };

  const recipesFetchStatus = useSelector(getRecipesFetchStatus);
  const recipes = useSelector(getRecipes);
  const dietFilteredRecipes = veganFilter(recipes.results, onlyVeganFilter);
  const finalRecipesFiltered = orderFilter(dietFilteredRecipes, orderBy);
  const recipesToBePushFetchStatus = useSelector(getRecipesToBePushFetchStatus);

  const handleLoadMoreButtonClick = () => {
    setFetchOffset((oldValue) => oldValue + 20);
    dispatch(fetchAsyncRecipesToBePush(recipesFetchParams));
    const checkerInterval = setInterval(() => {
      if (recipesToBePushFetchStatus === "success") {
        dispatch(pushNewRecipes());
        clearInterval(checkerInterval);
      }
      if (recipesToBePushFetchStatus === "failed") {
        clearInterval(checkerInterval);
      }
    }, 200);
  };

  useEffect(() => {
    // first calls to set data for handleLoadMoreButtonClick - don't delete
    setFetchOffset((oldValue) => oldValue + 20);
    dispatch(fetchAsyncRecipesToBePush(recipesFetchParams));
    // On mounting, load recipes if data is empty to prevent error
    if (!recipes.results) {
      dispatch(fetchAsyncRecipes(recipesFetchParams));
    }
  }, []);

  return recipesFetchStatus === "loading" ? (
    <Loading />
  ) : recipesFetchStatus === "success" ? (
    <RecipesListingContainer>
      <FormControlContainer>
        <FormControlLabel
          control={
            <Switch
              checked={vegetarianAndVeganFilter}
              onChange={handleVegetarianAndVeganFilter}
            />
          }
          label="Vegetarian and Vegan"
        />
        <FormControlLabel
          control={
            <Switch
              checked={onlyVeganFilter}
              onChange={handleOnlyVeganFilter}
            />
          }
          label="Only Vegan"
        />
        <FormControl size="small" sx={{ m: 4, minWidth: 150 }}>
          <InputLabel id="order-input-label">Order By</InputLabel>
          <Select
            labelId="order-by-input-label"
            id="order-by-input-id"
            label="order-by"
            value={orderBy}
            onChange={handleOrderBy}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="spoonacularScore">Rating</MenuItem>
            <MenuItem value="readyInMinutes">Ready time</MenuItem>
          </Select>
        </FormControl>
      </FormControlContainer>
      {recipesFetchParams.params.query && (
        <Typography
          variant="h6"
          align="center"
          color="secondary.dark"
          sx={{ mb: 4 }}
        >
          {recipes.totalResults == 0 ? (
            <b>No recipes found.</b>
          ) : (
            <b>Recipe{recipes.totalResults > 1 && "s"} found:</b>
          )}
        </Typography>
      )}
      <Grid container spacing={{ xs: 3 }}>
        {finalRecipesFiltered.map((recipe) => {
          return <RecipeCard key={recipe.id} data={recipe} />;
        })}
      </Grid>
      {recipes.results.length < recipes.totalResults && ( // show button if there are others recipes
        <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleLoadMoreButtonClick}
            disabled={recipesToBePushFetchStatus === "loading" ? true : false}
          >
            Load more
            {recipesToBePushFetchStatus === "loading" && (
              <Box sx={{ display: "flex", pl: 2 }}>
                <CircularProgress size="1.5rem" color="secondary" />
              </Box>
            )}
          </Button>
        </Box>
      )}
    </RecipesListingContainer>
  ) : (
    <ErrorMessage />
  );
}
