
import { Container, Grid2, Grow, } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Posts from '../Posts/Posts'
import { useDispatch } from 'react-redux'




const Home = ({currentId,setCurrentId}) => {
    const dispatch = useDispatch();

  
  return (
    <Grow in>
    <Container maxWidth='xl'>
      <Grid2 
        container 
        justifyContent="space-between" 
        alignItems="stretch" 
        spacing={3}
        sx={{
          flexDirection: { xs: 'column-reverse', sm: 'row' } 
        }}
      >
        <Grid2 item xs={12} sm={6} md={9}>
          <Posts setCurrentId={setCurrentId} />
        </Grid2>
      </Grid2>
    </Container>
  </Grow>
  )
}

export default Home
