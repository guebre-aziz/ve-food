import React from "react";
// Packages components
import { Link } from "react-router-dom";
// MUI
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Box,
  CardActionArea,
  Rating,
  Typography,
} from "@mui/material";

import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";

function RecipeCard(props) {
  const { data } = props;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Link
        to={`/recipe/${data.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card
          sx={{
            maxWidth: 345,
            minHeight: 350,
            maxHeight: 350,
            transition: "all 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "secondary.main",
            },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="180"
              image={data.image}
              alt={data.title}
              loading="lazy"
            />
            <CardContent>
              <Box sx={{}}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {data.title.length > 50
                    ? data.title.substring(0, 50) + "..."
                    : data.title}
                </Typography>
              </Box>
              <Box>
                {data.vegetarian && data.vegan ? (
                  <Chip color="primary" sx={{ mr: 1 }} label="Vegan" />
                ) : (
                  <Chip color="primary" sx={{ mr: 1 }} label="Vegetarian" />
                )}
                <Chip
                  size="large"
                  color="primary"
                  label={`${data.readyInMinutes} min`}
                  icon={<QueryBuilderRoundedIcon />}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography component="legend"></Typography>
                <Rating
                  name="score"
                  value={data.spoonacularScore / 20}
                  readOnly
                />
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
}

export default RecipeCard;
