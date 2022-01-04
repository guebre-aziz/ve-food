import React, { useEffect } from "react";
// Components & data
import {
  getSimilarRecipes,
  fetchAsyncSimilarRecipes,
  getSimilarRecipesFetchStatus,
} from "../features/recipes/recipeSlice";
// Packages elements
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

export default function SimilarRecipesList() {
  const recipeId = useParams().id;
  const dispatch = useDispatch();
  const similarRecipesData = useSelector(getSimilarRecipes);
  const similarRecipesFetchStatus = useSelector(getSimilarRecipesFetchStatus);

  useEffect(() => {
    dispatch(fetchAsyncSimilarRecipes(recipeId));
  }, [dispatch, recipeId]);

  return similarRecipesFetchStatus === "loading" ? (
    <Loading />
  ) : similarRecipesFetchStatus === "success" ? (
    similarRecipesData.length > 0 ? (
      <Box sx={{ p: 2 }}>
        <Grid
          container
          sx={{
            display: "flexbox",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            overflow: "auto",
          }}
        >
          {similarRecipesData.map((recipe) => {
            return (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card sx={{ width: 200, height: 200, m: 2 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        nowrap
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {recipe.title.length > 30
                          ? recipe.title.substring(0, 30) + "..."
                          : recipe.title}
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
      <Typography variant="h6" align="center" sx={{ p: 2 }}>
        No similar recipes found. 😥
      </Typography>
    )
  ) : (
    <ErrorMessage />
  );
}
