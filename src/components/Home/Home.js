
import { Container, Grid2, Grow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Posts from '../Posts/Posts'
import Form from "../Form/Form"
import { useDispatch } from 'react-redux'
import { getPost } from '../../actions/posts'

const Home = () => {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
  
    useEffect(() => {
      dispatch(getPost());
    }, [currentId,dispatch]);
  
  return (
    <Grow in>
    <Container>
      <Grid2 
        container 
        justifyContent="space-between" 
        alignItems="stretch" 
        spacing={3}
        sx={{
          flexDirection: { xs: 'column-reverse', sm: 'row' }  // Responsive handling here
        }}
      >
        <Grid2 item xs={12} sm={7}>
          <Posts setCurrentId={setCurrentId} />
        </Grid2>
        <Grid2 item xs={12} sm={4}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid2>
      </Grid2>
    </Container>
  </Grow>
  )
}

export default Home
