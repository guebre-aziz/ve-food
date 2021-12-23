import React from "react";
// Packages components
import { Link } from "react-router-dom";
// MUI
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Chip, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Rating } from "@mui/material";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";

function RecipeCard(props) {
  const { data } = props;
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Link to={`/recipe/${data.id}`} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            maxWidth: 345,
            minHeight: 400,
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="180"
              image={data.image}
              alt={data.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {data.title.substring(0, 50) + "..."}
              </Typography>
              <Grid>
                {data.vegetarian && data.vegan ? (
                  <Chip color="primary" sx={{ m: 1 }} label="Vegan" />
                ) : (
                  <Chip color="secondary" sx={{ m: 1 }} label="Vegetarian" />
                )}
              </Grid>
              <Box sx={{ padding: "0.5rem" }}>
                <Chip
                  size="large"
                  color="primary"
                  label={`${data.readyInMinutes} min`}
                  icon={<QueryBuilderRoundedIcon />}
                />
              </Box>
              <Grid m={1}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="score"
                  value={data.spoonacularScore / 20}
                  readOnly
                />
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
}

export default RecipeCard;
