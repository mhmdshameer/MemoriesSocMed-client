import React from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid2, CircularProgress } from '@mui/material';

const theme = createTheme();

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  return !posts?.length ? (
    <CircularProgress />
  ) : (
    <ThemeProvider theme={theme}>
      <Grid2 container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid2 key={post.id} item xs={12} sm={6} md={3}>
            {/* Changed 'sm' to 'md' for medium screens to display 4 per row */}
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid2>
        ))}
      </Grid2>
    </ThemeProvider>
  );
};

export default Posts;
