import React, { useEffect, useState } from "react";
// Components & data
import SimilarRecipesList from "../components/SimilarRecipesList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import {
  getRecipeDetails,
  fetchAsyncRecipesDetails,
  removeSelectedRecipe,
  getRecipeDetailsFetchStatus,
} from "../features/recipes/recipeSlice";
// Packages elements
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// MUI
import { styled, alpha } from "@mui/material/styles";
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

const RecipesDetailsContainer = styled("div")(({ theme }) => ({
  width: theme.spacing("80%"),
  margin: "auto",
  paddingTop: theme.spacing(10),
}));
const RecipeSummaryContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
}));
const RecipeDetailsImageContainer = styled("div")(({ theme }) => ({
  maxWidth: "50%",
  minWidth: theme.spacing(30),
  "& img": {
    borderRadius: theme.shape.borderRadius,
  },
}));
const IngredientsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(2),
}));

export default function RecipeDetails() {
  const [ingredientsUnit, setIngredientsUnit] = useState("metric");
  const handleUnit = (e, unit) => {
    console.log(e.target);
    if (unit !== null) {
      setIngredientsUnit(unit);
    }
  };

  const dispatch = useDispatch();
  const recipeId = useParams().id;
  const data = useSelector(getRecipeDetails);
  const recipeDetailsFetchStatus = useSelector(getRecipeDetailsFetchStatus);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    dispatch(fetchAsyncRecipesDetails(recipeId));
    return () => {
      dispatch(removeSelectedRecipe());
    };
  }, [dispatch, recipeId]);
  console.log(data);

  return recipeDetailsFetchStatus === "loading" ? (
    <Loading />
  ) : recipeDetailsFetchStatus === "success" ? (
    <RecipesDetailsContainer component="main">
      <RecipeSummaryContainer>
        <Box sx={{ maxWidth: "45%", minWidth: "15rem" }}>
          <Typography component="div" variant="h5" sx={{ p: 2 }}>
            {data.title}
          </Typography>
          <Grid container>
            {data.vegetarian && (
              <Box sx={{ p: 0.5 }}>
                <Chip size="large" color="primary" label="Vegetarian" />
              </Box>
            )}
            {data.vegan && (
              <Box sx={{ p: 0.5 }}>
                <Chip size="large" color="primary" label="Vegan" />
              </Box>
            )}

            <Box sx={{ p: 0.5 }}>
              <Chip
                size="large"
                color="primary"
                label={`${data.readyInMinutes} min`}
                icon={<QueryBuilderRoundedIcon />}
              />
            </Box>

            <Box sx={{ p: 0.5 }}>
              <Chip
                size="large"
                color="primary"
                label={`${data.servings} servings`}
                icon={<PersonRoundedIcon />}
              />
            </Box>
          </Grid>
        </Box>

        <RecipeDetailsImageContainer>
          <CardMedia component="img" image={data.image} alt={data.title} />
        </RecipeDetailsImageContainer>
      </RecipeSummaryContainer>

      <Grid sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Button color="secondary" variant="contained" href={data.sourceUrl}>
          Read directions
        </Button>
      </Grid>

      <Divider textAlign="center">
        <Chip label="Summary" />
      </Divider>

      <Box sx={{ p: 2 }}>
        <Typography
          dangerouslySetInnerHTML={{ __html: data.summary }}
        ></Typography>
      </Box>

      <Divider textAlign="center">
        <Chip label="Ingredients" />
      </Divider>

      <IngredientsContainer>
        <ToggleButtonGroup
          value={ingredientsUnit}
          exclusive
          onChange={handleUnit}
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
                {Math.round(ingredient.measures[ingredientsUnit].amount) +
                  " " +
                  ingredient.measures[ingredientsUnit].unitLong +
                  "  " +
                  ingredient.name.toUpperCase()}
              </Typography>
            </Box>
          );
        })}
      </IngredientsContainer>

      {data.analyzedInstructions.length > 0 && ( // Some recipes has not step-by-step Instructions!
        <>
          <Divider textAlign="center">
            <Chip label="Instructions" />
          </Divider>

          <Grid sx={{ m: 4 }}>
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
        </>
      )}

      <Box>
        <Typography variant="h5" align="center" sx={{ p: 2 }}>
          Similar recipes
        </Typography>
        <SimilarRecipesList />
      </Box>
    </RecipesDetailsContainer>
  ) : (
    <ErrorMessage />
  );
}
