import React from "react";
// Packages components

// MUI
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";

const TableContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  width: "100%",
  maxWidth: 320,
  backgroundColor: "white",
  right: 25,
  top: 65,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[8],
  zIndex: theme.zIndex.drawer,
}));

function AutocompleteTable(props) {
  const data = props.data;
  const handleSuggestClick = props.handleSuggestClick;
  return (
    props.data.length > 0 && (
      <TableContainer>
        <nav aria-label="suggestions-table">
          <List>
            {data.length &&
              data.map((row) => {
                return (
                  <ListItem key={row.id} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleSuggestClick(row.title);
                      }}
                    >
                      <ListItemText primary={row.title} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </nav>
      </TableContainer>
    )
  );
}

export default AutocompleteTable;
