import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid2, CircularProgress } from '@mui/material';

const theme = createTheme();

const Posts = ({setCurrentId}) => {

  const posts = useSelector((state)=> state.posts.data)
  const classes= useStyles()

  return (
    !posts?.length ? <CircularProgress/> : (
        <ThemeProvider theme={theme}>
             <Grid2 className={classes.container} container alignItems='stretch' spacing={3} >
         {posts.map(post=>(
          <Grid2 key={post.id} item xs={12} sm={6} >
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid2>
         ))}  
      </Grid2>
    </ThemeProvider> 
      )
  )
}

export default Posts
