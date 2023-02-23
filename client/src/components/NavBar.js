import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// component property contains link so the button knows to act like a link (per mui.com third-party routing library). To= tells it where to go. This way we don't need event listeners. Link allows us to navigate without a page refresh.

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Book Reviews
        </Typography>
        <Button color="inherit" to="/" component={Link}>
          Home
        </Button>
        <Button color="inherit" to="/signup" component={Link}>
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
