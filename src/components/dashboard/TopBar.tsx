import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const TopBar: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#ffd900"}}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
