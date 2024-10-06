import { ThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  AppBar,
  Avatar,
  Button,
  createTheme,
  Grid2,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import memories from "../../images/memories.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import Paginate from "../pagination";
import { AddPhotoAlternate } from "@mui/icons-material";

const theme = createTheme();

const Navbar = () => {
  const [user, setUser] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : null;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          borderRadius: 2,
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 50px",
        }}
      >
        <Grid2 container alignItems="center" spacing={3}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Grid2 item>
              <Typography
                component={Link}
                to="/"
                variant="h4" // Reduced the size from h2 to h4 for a more subtle look
                sx={{ color: "rgba(0,183,255, 1)", textDecoration: "none" }}
              >
                Memories
              </Typography>
            </Grid2>
            <Grid2 item>
              <img
                src={memories}
                alt="memories"
                height="50" // Reduced size for better proportion
                width="50"
                style={{ marginLeft: "15px" }}
              />
            </Grid2>
          </div>
        </Grid2>
        <Toolbar
          sx={{ display: "flex", justifyContent: "flex-end", width: "400px" }}
        >
          {user ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "400px",
              }}
            >
              <Avatar
                sx={{ bgcolor: deepPurple[500] }}
                src={user.result.picture}
                alt={user.result.name}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {user.result.name}
              </Typography>
              <IconButton
                component={Link}
                to="/form"
                sx={{
                  marginLeft: "15px",
                  display: "flex",
                  alignItems: "center", // Aligns the text and icon properly
                }}
                color="primary"
              >
                <AddPhotoAlternate fontSize="large" />
              </IconButton>

              <Button variant="contained" color="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              component={Link}
              to="/auth"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={6}
          sx={{
            padding: "10px 10px",
            borderRadius: 2,
            marginBottom: "20px",
            marginTop: "-20px",
          }}
        >
          <Paginate />
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Navbar;
