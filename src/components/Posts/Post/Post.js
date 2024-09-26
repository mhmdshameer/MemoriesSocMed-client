import React from 'react'
import useStyles from './styles'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import moment from "moment"
import { Delete, FavoriteBorder, MoreHoriz } from "@mui/icons-material"



const theme = createTheme();

const Post = ({post}) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
    <Card className={classes.card} >
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title } />
      <div className={classes.overlay}>
        <Typography variant='h6'> {post.creator} </Typography>
        <Typography variant='body2'> {moment(post.createdAt).fromNow()}  </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{color: 'white'}} size='small' onClick={()=>{}}>
         <MoreHoriz fontSize='default' />
        </Button>
      </div>
      <div className={classes.details}>
      <CardContent>
      <Typography variant='body2'> {post.tags.map((tag)=> `#${tag} `)}  </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' onClick={()=> {}}>
          <FavoriteBorder/>
          Like
          {post.likeCount}
        </Button>
        <Button size='small' color='primary' onClick={()=> {}}>
          <Delete/>
          Delete
        </Button>
      </CardActions>
      </div>
    </Card>
    </ThemeProvider>
  )
}

export default Post
