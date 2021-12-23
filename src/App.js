import React from "react";
import Home from "./pages/Home";
import SearchBar from "./components/SearchBar";
import RecipeDetails from "./pages/RecipeDetails";
import NotFound from "./pages/NotFound";
import Footer from "./pages/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
