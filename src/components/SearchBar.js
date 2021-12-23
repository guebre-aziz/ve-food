import React, { useState, useEffect } from "react";
// Components & data
import { useDispatch } from "react-redux";
import { fetchAsyncRecipes } from "../features/recipes/recipeSlice";
import Logo from "../images/ve-food-brand-icon.svg";
// Packages components
import { Link, useNavigate } from "react-router-dom";
// MUI
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Toolbar, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
require("dotenv").config();

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.secondary.main, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.25),
  },

  width: "auto",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "150%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

function SearchBar() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const recipesFetchParam = {
    params: {
      query: searchInput,
      apiKey: process.env.SPOONACULAR_API_KEY,
      diet: "vegetarian, vegan",
      instructionsRequired: true,
      fillIngredients: true,
      addRecipeInformation: true,
      addRecipeNutrition: false,
      tags: "vegetarian, vegan",
      ignorePantry: false,
    },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncRecipes(recipesFetchParam));
  }, []);

  const handleOnChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchAsyncRecipes(recipesFetchParam));
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box container>
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                style={{ maxWidth: "100%", padding: "5px" }}
              />
            </Link>
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Box component="form" onSubmit={handleOnSubmit}>
              <StyledInputBase
                value={searchInput}
                onChange={handleOnChange}
                placeholder="Search recipes"
                inputProps={{ "aria-label": "search recipes" }}
              />
            </Box>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchBar;
