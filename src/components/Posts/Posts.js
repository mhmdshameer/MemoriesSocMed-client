import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, CircularProgress } from "@mui/material";

const theme = createTheme();

const Posts = ({ setCurrentId }) => {
  const { posts } = useSelector((state) => state.posts);

  return !posts?.length ? (
    <CircularProgress />
  ) : (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={2} // Space between cards
        sx={{
          justifyContent: 'center', // Centering the grid items
          width: "100%", // Full width
        }}
      >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}> 
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default Posts;
