
import { Container, Grid2, Grow, Paper, AppBar, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Chip from '@mui/material'
import Posts from '../Posts/Posts'
import { useDispatch } from 'react-redux'
import { getPost } from '../../actions/posts'

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = ({currentId,setCurrentId}) => {
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
  
    useEffect(() => {
      dispatch(getPost());
    }, [currentId,dispatch]);
  
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
        <Grid2 item xs={12} sm={6} md={3} >
           <AppBar className={''} position='static' color='inherit' >
            <TextField 
              name='search'
              variant='outlined'
              label='Search Memories'
              fullWidth
              value="TEST"
              onChange={()=>{}}
            />
           </AppBar>
        </Grid2>
      </Grid2>
    </Container>
  </Grow>
  )
}

export default Home
