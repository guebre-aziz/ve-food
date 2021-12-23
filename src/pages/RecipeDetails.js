import React, { useEffect, useState } from "react";
// Components & data
import SimilarRecipesList from "../components/SimilarRecipesList";
// package elements
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedRecipes,
  fetchAsyncRecipesDetails,
} from "../features/recipes/recipeSlice";
// MUI
import {
  Grid,
  Typography,
  CardMedia,
  Box,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function RecipeDetails() {
  const [ingredientUnit, setIngredientUnit] = useState("metric");

  const handleFormat = (event, newFormat) => {
    console.log(event.target);
    if (newFormat !== null) {
      setIngredientUnit(newFormat);
    }
  };

  const recipeId = useParams().id;
  const dispatch = useDispatch();
  const data = useSelector(getSelectedRecipes);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    dispatch(fetchAsyncRecipesDetails(recipeId));
  }, [dispatch, recipeId]);

  return (
    <>
      <Box component="main" className="recipe-details-wrapper">
        <Box component="section" className="recipe-summary-wrapper">
          <Box className="recipe-details">
            <Box sx={{ p: 2 }}>
              <Typography variant="h5">{data.title}</Typography>
            </Box>
            <Grid container>
              {data.vegetarian && (
                <Box sx={{ padding: "0.5rem" }}>
                  <Chip size="large" color="primary" label="Vegetarian" />
                </Box>
              )}

              {data.vegan && (
                <Box sx={{ padding: "0.5rem" }}>
                  <Chip size="large" color="primary" label="Vegan" />
                </Box>
              )}

              <Box sx={{ padding: "0.5rem" }}>
                <Chip
                  size="large"
                  color="primary"
                  label={`${data.readyInMinutes} min`}
                  icon={<QueryBuilderRoundedIcon />}
                />
              </Box>

              <Box sx={{ padding: "0.5rem" }}>
                <Chip
                  size="large"
                  color="primary"
                  label={`${data.servings} servings`}
                  icon={<PersonRoundedIcon />}
                />
              </Box>
            </Grid>
          </Box>

          <Grid className="recipe-details-image">
            <CardMedia component="img" image={data.image} alt={data.title} />
          </Grid>
        </Box>
        <Grid sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Button color="secondary" variant="contained" href={data.sourceUrl}>
            Read directions
          </Button>
        </Grid>

        <Divider textAlign="center">Summary</Divider>

        <Box component="div" className="main-summary-wrapper">
          <Typography
            dangerouslySetInnerHTML={{ __html: data.summary }}
          ></Typography>
        </Box>

        <Divider textAlign="center">Ingredient</Divider>

        <Box component="div" className="ingerdient-wrapper">
          <ToggleButtonGroup
            value={ingredientUnit}
            exclusive
            onChange={handleFormat}
            aria-label="text formatting"
            sx={{ p: 2 }}
          >
            <ToggleButton value="metric" aria-label="metric">
              metric
            </ToggleButton>
            <ToggleButton value="us" aria-label="us">
              us
            </ToggleButton>
          </ToggleButtonGroup>
          {data.extendedIngredients.map((ingredient, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  p: 1,
                }}
              >
                <AddCircleOutlineRoundedIcon sx={{ pr: 1 }} />
                <Typography>
                  {Math.round(ingredient.measures[ingredientUnit].amount) +
                    " " +
                    ingredient.measures[ingredientUnit].unitLong +
                    "  " +
                    ingredient.name.toUpperCase()}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Divider textAlign="center">Instructions</Divider>

        <Grid>
          {data.analyzedInstructions[0].steps.map((step, index) => {
            return (
              <Box
                key={index}
                sx={{
                  p: 2,
                  display: "flex",
                }}
              >
                <Chip size="large" color="primary" label={index + 1} />
                <Typography sx={{ pl: 2 }}>{step.step}</Typography>
              </Box>
            );
          })}
        </Grid>

        <Divider textAlign="center">Similar recipes</Divider>

        <SimilarRecipesList />
      </Box>
    </>
  );
}

export default RecipeDetails;

// TODO: add data type checking!!!!
