import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'

const Posts = () => {
  const classes= useStyles()
  return (
    <div>
      <Post/>
      <h1>Post</h1>
    </div>
  )
}

export default Posts
