import React, { useState } from "react";
// Components & data
import RecipeCard from "../components/RecipeCard";
// Packages components
import { useSelector } from "react-redux";
// MUI
import { Grid } from "@mui/material";
import { getAllRecipes } from "../features/recipes/recipeSlice";
import {
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

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

  const dietFilter = (data) => {
    if (onlyVeganFilter) {
      return data.filter((data) => data.vegan === true);
    }
    return data;
  };

  const orderFilter = (data, orderValue) => {
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

  const recipes = useSelector(getAllRecipes).results;
  const dietFilteredRecipes = dietFilter(recipes);
  const finalRecipesFiltered = orderFilter(dietFilteredRecipes, orderBy);

  return finalRecipesFiltered.length ? (
    <div className="recipesListing">
      <div className="filterElement">
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
      </div>

      <Grid
        container
        spacing={{ xs: 3, md: 3 }}
        columns={{ xs: 1, sm: 9, md: 16 }}
      >
        {finalRecipesFiltered.map((recipe) => {
          return <RecipeCard key={recipe.id} data={recipe} />;
        })}
      </Grid>
    </div>
  ) : (
    <h2>No recipes</h2>
  );
}

export default RecipesListing;
