import React, { useState } from "react";
// Components & data
import RecipeCard from "../components/RecipeCard";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
// Packages components
import { useSelector } from "react-redux";
// MUI
import { styled, alpha } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import {
  getRecipes,
  getRecipesFetchStatus,
} from "../features/recipes/recipeSlice";
import {
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";

const RecipesListingContainer = styled("div")(({ theme }) => ({
  width: theme.spacing("80%"),
  margin: "auto",
  padding: theme.spacing(5),
  paddingTop: theme.spacing(12),
  backgroundColor: "white",
}));

const FormControlContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

function RecipesListing() {
  const [vegetarianAndVeganFilter, setVegetarianAndVeganFilter] =
    useState(true);
  const [onlyVeganFilter, setOnlyVeganFilter] = useState(false);
  const [orderBy, setOrderBy] = useState("");

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

  const recipes = useSelector(getRecipes).results;
  const recipesFetchStatus = useSelector(getRecipesFetchStatus);
  const dietFilteredRecipes = veganFilter(recipes, onlyVeganFilter);
  const finalRecipesFiltered = orderFilter(dietFilteredRecipes, orderBy);

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
      <Typography
        variant="h6"
        align="center"
        color="secondary.main"
        sx={{ mb: 4 }}
      >
        <b>Result:</b>
      </Typography>
      <Grid container spacing={{ xs: 3 }}>
        {finalRecipesFiltered.map((recipe) => {
          return <RecipeCard key={recipe.id} data={recipe} />;
        })}
      </Grid>
    </RecipesListingContainer>
  ) : (
    <ErrorMessage />
  );
}

export default RecipesListing;
