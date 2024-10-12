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
import { getPost, getSearchPosts } from "../../actions/posts";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    dispatch(getSearchPosts({ search: "none", tags: post?.tags.join(",") }));
  }, [post]);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (!post) return null;
  if (isLoading) {
    return (
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "15px",
          height: "39vh",
        }}
      >
        <CircularProgress size="7rem" />
      </Paper>
    );
  }
  const recommendedPost = posts.filter((_id) => _id !== post._id);
  return (
    <Paper elevation={6} sx={{ padding: "20px", borderRadius: "15px" }}>
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
          <CommentSection post={post} />
          <Divider sx={{ margin: "20px 0" }} />
        </Box>
        <Box
          sx={{
            margin: "20px",
            display: "flex",
            flex:'1',
            marginLeft: { sm: "20px", xs: "0px" },
          }}
        >
          <img
            style={{
              justifyContent: "center",
              alignItems: "center",
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
      {recommendedPost.length && (
        <Box
          sx={{
            borderRadius: "20px",
            margin: "10px",
            flex: 1,
          }}
        >
          <Typography gutterBottom variant="h5">
            You might also like
          </Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            {recommendedPost.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message.length > 100
                      ? `${message.substring(0, 100)}...`
                      : message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img
                    style={{
                      width: "200px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    src={selectedFile}
                    alt={title}
                  />
                </div>
              )
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default PostDetails;
