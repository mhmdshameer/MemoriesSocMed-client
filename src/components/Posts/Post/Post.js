import React from 'react'
import useStyles from './styles'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const Post = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
    <div>
      <h1>Posts</h1>
    </div>
    </ThemeProvider>
  )
}

export default Post
