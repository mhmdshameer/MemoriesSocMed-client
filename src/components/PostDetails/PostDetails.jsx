import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { getPost } from "../../actions/posts";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  if (!post) return null;
  if (isLoading) {
    return (
      <Paper
        elevation={6}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress size="7rem" />
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // responsive behavior
        width: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          borderRadius: "20px",
          margin: "10px",
        }}
      >
        <Typography variant="h3" component="h2">
          {post.title}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          color="textSecondary"
          component="h2"
        >
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
          {post.message}
        </Typography>
        <Typography variant="h6">Created by: {post.name}</Typography>
        <Typography variant="body1">
          {moment(post.createdAt).fromNow()}
        </Typography>
        <Divider sx={{ margin: "20px 0" }} />
        <Typography variant="body1">
          <strong>Realtime Chat - coming soon!</strong>
        </Typography>
        <Divider sx={{ margin: "20px 0" }} />
        <Typography variant="body1">
          <strong>Comments - coming soon!</strong>
        </Typography>
        <Divider sx={{ margin: "20px 0" }} />
      </Box>
      <Box
        sx={{
          marginLeft: { sm: "20px", xs: "0px" },
        }}
      >
        <img
          style={{
            borderRadius: "20px",
            objectFit: "cover",
            width: "100%",
            maxHeight: "600px",
          }}
          src={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          alt={post.title}
        />
      </Box>
    </Box>
  );
};

export default PostDetails;
