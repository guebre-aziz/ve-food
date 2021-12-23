import React, { useEffect } from "react";
// Components & data
import {
  getSimilarRecipes,
  fetchAsyncSimilarRecipes,
} from "../features/recipes/recipeSlice";
// Components

// packages elements
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// MUI
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Chip,
} from "@mui/material";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

function SimilarRecipesList() {
  const recipeId = useParams().id;
  const dispatch = useDispatch();
  const similarRecipesData = useSelector(getSimilarRecipes);

  useEffect(() => {
    dispatch(fetchAsyncSimilarRecipes(recipeId));
  }, [dispatch, recipeId]);

  return similarRecipesData.length ? (
    <Box className="similar-recipes-listing-wrapper">
      <Grid container sx={{ display: "flexbox", justifyContent: "center" }}>
        {similarRecipesData.map((recipe) => {
          return (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ maxWidth: 200 }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {recipe.title}
                    </Typography>
                    <Box sx={{ padding: "0.5rem" }}>
                      <Chip
                        size="large"
                        color="primary"
                        label={`${recipe.readyInMinutes} min`}
                        icon={<QueryBuilderRoundedIcon />}
                      />
                    </Box>
                    <Box sx={{ padding: "0.5rem" }}>
                      <Chip
                        size="large"
                        color="primary"
                        label={`${recipe.servings} servings`}
                        icon={<PersonRoundedIcon />}
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          );
        })}
      </Grid>
    </Box>
  ) : (
    <Typography variant="h6">No similar recipes found.</Typography>
  );
}

export default SimilarRecipesList;
