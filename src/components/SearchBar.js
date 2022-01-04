import React, { useState, useEffect, useRef } from "react";
// Components & data
import {
  fetchAsyncRecipes,
  fetchAsyncAutocompleteData,
  getAutocompleteData,
} from "../features/recipes/recipeSlice";
import Logo from "../images/ve-food-brand-icon.svg";
// Packages components
import { useDispatch, useSelector } from "react-redux";
import AutocompleteTable from "./AutocompleteTable";
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

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const searchElement = useRef(null);
  const recipesFetchParam = {
    params: {
      query: searchInput,
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
  const autocompleteParams = {
    params: {
      query: searchInput,
      apiKey: "bda05a2de18f42998ca6507d78930517",
      number: 5,
    },
  };
  const [isFocus, setIsFocus] = useState(false);

  const handleOnFocus = () => {
    setIsFocus(true);
  };
  const handleOnBlur = () => {
    setTimeout(() => {
      // timeout-wrapped to prevent disappearance before action
      setIsFocus(false);
    }, 0.5);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncAutocompleteData(autocompleteParams));
  }, [searchInput]);

  console.log(process.env.SPOONACULAR_API_KEY);
  const autocompleteData = useSelector(getAutocompleteData);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchAsyncRecipes(recipesFetchParam));
    navigate("/home");
    setSearchInput("");
  };

  const handleSuggestClick = (suggestionText) => {
    setSearchInput(suggestionText);
    dispatch(fetchAsyncRecipes(recipesFetchParam));
    navigate("/home");
    setSearchInput("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ boxShadow: 0, transition: "all 0.2s" }}>
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
                value={searchInput}
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

export default SearchBar;
