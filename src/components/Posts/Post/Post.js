import React from 'react'
import useStyles from './styles'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import moment from "moment"
import { Delete, FavoriteBorder, MoreHoriz } from "@mui/icons-material"
import {useDispatch} from "react-redux"
import { deletePost, likePost } from '../../../actions/posts';


const theme = createTheme();

const Post = ({post, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  return (
    <ThemeProvider theme={theme}>
    <Card className={classes.card} >
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title } />
      <div className={classes.overlay}>
        <Typography variant='h6'> {post.creator} </Typography>
        <Typography variant='body2'> {moment(post.createdAt).fromNow()}  </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button 
        style={{color: 'white'}} 
        size='small' 
        onClick={()=> setCurrentId(post._id)}>
        
         <MoreHoriz fontSize='default' />
        </Button>
      </div>
      <div className={classes.details}>
      <Typography variant='body2'> {post.tags?.map((tag)=> `#${tag} `)}  </Typography>
      </div>
      <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent  >
      <Typography variant='body2' color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))}>
          <FavoriteBorder  />
          &nbsp;Like&nbsp;
          {post.likeCounts}
          
        </Button>
        <Button size='small' color='primary' onClick={()=> dispatch(deletePost(post._id))}>
          <Delete/>
          Delete
        </Button>
      </CardActions>
    </Card>
    </ThemeProvider>
  )
}

export default Post
