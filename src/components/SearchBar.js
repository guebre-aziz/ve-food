import React, { useState, useEffect, useRef } from "react";
// Components & data
import {
  fetchAsyncRecipes,
  fetchAsyncAutocompleteData,
  getAutocompleteData,
  setSearchKey,
  getSearchKey,
} from "../features/recipes/recipeSlice";
import Logo from "../images/ve-food-brand-icon.svg";
import AutocompleteTable from "./AutocompleteTable";
// Packages components
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// MUI
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Toolbar, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
require("dotenv").config();

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.secondary.main, 0.5),
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
    width: "20ch",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
    },
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  width: theme.spacing(16),
  padding: theme.spacing(0.4),
  transition: "all 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

export default function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchElement = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const autocompleteData = useSelector(getAutocompleteData);
  const searchKey = useSelector(getSearchKey);
  const recipesFetchParams = {
    params: {
      query: searchKey,
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

  const autocompleteParams = {
    params: {
      query: searchKey,
      apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
      number: 5,
    },
  };

  const handleOnFocus = () => {
    setIsFocus(true);
  };
  const handleOnBlur = () => {
    setTimeout(() => {
      // timeout-wrapped to prevent disappearance before action
      setIsFocus(false);
    }, 100);
  };

  const handleOnChange = (e) => {
    dispatch(setSearchKey(e.target.value));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchAsyncRecipes(recipesFetchParams));
    setIsFocus(false);
    navigate("/home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSuggestClick = (suggestionText) => {
    dispatch(setSearchKey(suggestionText));
    dispatch(fetchAsyncRecipes(recipesFetchParams));
    navigate("/home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(fetchAsyncAutocompleteData(autocompleteParams));
  }, [searchKey]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ boxShadow: 0 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <LogoContainer>
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                style={{ maxWidth: "100%", padding: "5px" }}
              />
            </Link>
          </LogoContainer>

          <Search id="search">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Box component="form" onSubmit={handleOnSubmit}>
              <StyledInputBase
                ref={searchElement}
                value={searchKey}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                placeholder="Search recipes"
                inputProps={{ "aria-label": "search recipes" }}
              />
            </Box>
          </Search>
        </Toolbar>
      </AppBar>
      {isFocus && (
        <AutocompleteTable
          data={autocompleteData}
          handleSuggestClick={handleSuggestClick}
        />
      )}
    </Box>
  );
}
