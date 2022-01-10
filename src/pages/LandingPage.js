import React, { useEffect } from "react";
// Components & data
import {
  fetchAsyncRecipes,
  setSearchKey,
} from "../features/recipes/recipeSlice";
import LandingPageImg from "../images/landing-page-img.jpg";
import Logo from "../images/ve-food-brand-icon.svg";
// Packages components
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI
import { Grid, Box, Typography, Button } from "@mui/material";
require("dotenv").config();

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipesFetchParams = {
    params: {
      query: "",
      number: 20,
      offset: 0,
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

  const handleClick = () => {
    dispatch(fetchAsyncRecipes(recipesFetchParams));
    navigate("/home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(setSearchKey(""));
  }, []);
  return (
    <header>
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
            sm={{ variant: "h5" }}
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
            color="greenLogo"
            size="large"
            onClick={handleClick}
          >
            Explore
          </Button>
        </Grid>
      </Box>
    </header>
  );
}
