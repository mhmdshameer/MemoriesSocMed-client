import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid2, CircularProgress } from "@mui/material"; // Removed Box, we'll use Grid directly

const theme = createTheme();

const Posts = ({ setCurrentId }) => {
  const { posts } = useSelector((state) => state.posts);

  return !posts?.length ? (
    <CircularProgress />
  ) : (
    <ThemeProvider theme={theme}>
      <Grid2
        container
        spacing={2} // Keeps cards spaced
        justifyContent="center" // Center content
        sx={{ width: "100%" }}
      >
        {posts.map((post) => (
          <Grid2
            key={post._id}
            item
            xs={12} sm={6} md={4} lg={3} // 4 cards per row on large screens
          >
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid2>
        ))}
      </Grid2>
    </ThemeProvider>
  );
};

export default Posts;
