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
  Chip,
} from "@mui/material";
import memories from "../../images/memories.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import Paginate from "../pagination";
import { AddPhotoAlternate } from "@mui/icons-material";
import { getSearchPosts } from "../../actions/posts";

const theme = createTheme();
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Navbar = () => {
  const [user, setUser] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : null;
  });
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [memorySearch, setMemorySearch] = useState(""); // State for memory search input
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
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

  const handleAddTag = (e) => {
    if (e.key === "Enter" && search) {
      setTags([...tags, search]); // Add the tag to the state
      setSearch(""); // Clear the input field
    }
  };

  
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    const trimmedMemorySearch = memorySearch.trim();
    const trimmedTagSearch = search.trim();
  
    if (trimmedMemorySearch || trimmedTagSearch || tags.length > 0) {
      const searchQuery = trimmedMemorySearch || trimmedTagSearch; // Use memorySearch or search as the primary search query
      const tagsString = tags.join(","); // Join tags into a single string
  
      console.log({ search: searchQuery, tags: tagsString }); // Debugging output
      dispatch(getSearchPosts({ search: searchQuery, tags: tagsString }));
    } else {
      navigate("/");
    }
  };
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
    display: "flex",
    justifyContent: "center", // Spread the items out
    alignItems: "center", // Vertically align them
    gap: "20px", // Optional: Space between components
    marginTop: "-20px",
    marginBottom: "20px",
  }}
>
  {/* Pagination Component with flex: 2 */}
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
      display: "flex",
      alignItems: "center", // Ensure the pagination is centered
    }}
  >
    <Paginate />
  </Paper>

  {/* Search Memories AppBar with flex: 1 */}
  <AppBar
    position="static"
    color="inherit"
    sx={{
      display: "flex",
      flexDirection: "row",
      borderRadius: "10px",
      alignItems: "center",
      padding: "5px 10px",
      backgroundColor: "transparent",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
      height: "50px",
      flexGrow: 1,
      maxWidth: "500px",
    }}
  >
    {/* Input Field for Search Memories */}
    <TextField
      variant="outlined"
      label="Search Memories" // New TextField for searching memories
      placeholder="Type to search memories..."
      value={memorySearch} // New state variable for memory search
      onChange={(e) => setMemorySearch(e.target.value)} // Update memory search state
      onKeyDown={(e) => e.key === 'Enter' && searchPost()} // Trigger search on Enter
      sx={{
        flexGrow: 1,
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

    {/* Existing Input Field for Search by tags */}
    <TextField
      variant="outlined"
      label="Search by tags"
      placeholder="Enter tag and press enter"
      value={search}
      onChange={(e) => setSearch(e.target.value)} // Update the search input state
      onKeyDown={handleAddTag} // Optional: You can still add tags via keydown event
      sx={{
        flexGrow: 1,
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

    {/* Chips Display */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap", // Prevents chips from wrapping
        gap: "8px",
        marginLeft: "10px",
        maxWidth: "60%",
        overflowX: "auto", // Allows scrolling if needed
      }}
    >
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          onDelete={() => handleDelete(tag)} // Handle tag deletion
          sx={{
            backgroundColor: "transparent",
            border: "1px solid gray",
            whiteSpace: "nowrap",
          }}
        />
      ))}
    </Box>

    {/* Search Button */}
    <Button
      variant="contained"
      color="primary"
      onClick={searchPost} // Trigger search when clicked
      sx={{ marginLeft: "10px" }} // Space between button and chips
    >
      Search
    </Button>
  </AppBar>
</Box>

    </ThemeProvider>
  );
};

export default Navbar;
