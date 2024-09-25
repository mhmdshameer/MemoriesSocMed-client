import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const Posts = () => {

  const posts = useSelector((state)=> state.posts)
  const classes= useStyles()

  console.log(posts);

  return (
    <ThemeProvider theme={theme}>

    <div>
      <Post/>
      <h1>Post</h1>
    </div>
    </ThemeProvider>
  )
}

export default Posts
