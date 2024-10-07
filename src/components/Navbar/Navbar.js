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
  TextField,
  Autocomplete,
  Chip,
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
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
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

  const handleOnKeyDown = (e) => {
    // Implement search functionality if needed
  };

  const handleAddTag = (event, newValue) => {
    setTags(newValue);
  };

  const searchPost = ()=>{
    if(search.trim()){

    }else{
      navigate('/')
    }
  }

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
                variant="h4"
                sx={{ color: "rgba(0,183,255, 1)", textDecoration: "none" }}
              >
                Memories
              </Typography>
            </Grid2>
            <Grid2 item>
              <img
                src={memories}
                alt="memories"
                height="50"
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{ bgcolor: deepPurple[500] }}
                src={user.result.picture}
                alt={user.result.name}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography variant="h6" sx={{ marginLeft: "10px" }}>
                {user.result.name}
              </Typography>
              <IconButton
                component={Link}
                to="/form"
                sx={{ marginLeft: "15px" }}
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

      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "-15px",
          marginBottom: "20px",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: "5px 10px",
            borderRadius: 2,
            backgroundColor: "transparent",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            height: "40px",
          }}
        >
          <Paginate />
        </Paper>

        <Grid2 item xs={12} sm={6} md={3}>
          <AppBar
            position="static"
            color="inherit"
            sx={{
              display: "flex",
              flexDirection: "row",
              borderRadius: "10px",
              marginBottom: "1rem",
              alignItems: "center",
              padding: "5px 10px",
              backgroundColor: "transparent",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
              height: "50px",
              width: "auto", // Optional: Set to a fixed value or a percentage
              maxWidth: "1200px", // Set a max width to control the overall size
              margin: "0 auto", // Center the AppBar
            }}
          >
            <TextField
              name="search"
              variant="outlined"
              label="Search Memories"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleOnKeyDown}
              sx={{
                flexGrow: 1, // Allow the TextField to grow
                height: "100%",
                marginRight: "10px", // Space between the TextField and Autocomplete
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              }}
            />
            <Autocomplete
              multiple
              freeSolo
              options={tags}
              value={tags}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "4px",
                width: "50px",
              }}
              onChange={(event, newValue) => setTags(newValue)}
              renderTags={(value, getTagProps) => (
                <Box>
                  {value.map((option, index) => (
                    <Chip
                      key={index}
                      label={option}
                      {...getTagProps({ index })}
                      sx={{
                        backgroundColor: "transparent",
                        border: "1px solid gray",
                      }}
                    />
                  ))}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Search Tags"
                  placeholder="Favorites"
                  sx={{
                    flexGrow: 1,
                    maxWidth: "500px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
              )}
            />
            <Button onClick={searchPost} variant="contained" color="primary" sx={{}}>
              Search
            </Button>
          </AppBar>
        </Grid2>
      </Box>
    </ThemeProvider>
  );
};

export default Navbar;
