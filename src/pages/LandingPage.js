import React from "react";
// Components & data
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncRecipes } from "../features/recipes/recipeSlice";
// Packages components
import { Link, useNavigate } from "react-router-dom";
import LandingPageImg from "../images/landing-page-img.jpg";
import Logo from "../images/ve-food-brand-icon.svg";
// MUI
import { Grid, Box, Typography, Button } from "@mui/material";
import { maxWidth } from "@mui/system";

const recipesFetchParam = {
  params: {
    query: "",
    apiKey: "bda05a2de18f42998ca6507d78930517",
    diet: "vegetarian, vegan",
    instructionsRequired: true,
    fillIngredients: true,
    addRecipeInformation: true,
    addRecipeNutrition: false,
    tags: "vegetarian, vegan",
    ignorePantry: false,
  },
};

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(fetchAsyncRecipes(recipesFetchParam));
    navigate("/home");
  };
  return (
    <Box
      sx={{
        backgroundImage: `url(${LandingPageImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: 300,
            p: 1,
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(5px)",
            borderRadius: 3,
          }}
        >
          <img src={Logo} alt="" style={{ maxWidth: "100%" }} />
        </Box>
        <Typography
          variant="h4"
          align="center"
          color="secondary.main"
          sx={{
            p: 3,
            m: 4,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(2px)",
            borderRadius: 2,
          }}
        >
          Thousands of <b>Vegetarian</b> and <b>Vegan</b> recipes for you now!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleClick}
        >
          Explore Free
        </Button>
      </Grid>
    </Box>
  );
}
