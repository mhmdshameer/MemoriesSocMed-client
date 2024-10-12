import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  ButtonBase,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import moment from "moment";
import {
  Delete,
  Favorite,
  FavoriteBorderOutlined,
  MoreHoriz,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result.googleId || user?.result?._id
  const hasLikedPost = likes.find(
    (like) => like === userId
  );
  const handleLike = () => {
    dispatch(likePost(post._id));
    if(hasLikedPost){
      setLikes(likes.filter((id) => id !== userId))
    }else{
      setLikes([...likes,userId])
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === userId
      ) ? (
        <>
          <Favorite fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FavoriteBorderOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "like" : "likes"}
        </>
      );
    }
    return (
      <>
        <FavoriteBorderOutlined fontSize="small" />
        &nbsp; like
      </>
    );
  };

  const handleEdit = () => {
    setCurrentId(post._id);
    navigate("/form");
  };

  const openPost = () => navigate(`/posts/${post._id}`);

  return (
    <ThemeProvider theme={theme}>
      <Card
        raised
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "15px",
          height: "100%",
          position: "relative",
        }}
      >
        <ButtonBase
          component="div"
          onClick={openPost}
          sx={{
            display: "block", // Ensure the contents inside ButtonBase expand fully
            textAlign: "initial", // Remove button text alignment behavior
          }}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              sx={{
                height: 200,
                objectFit: "cover",
              }}
              image={post.selectedFile || "defaultImageURL"}
              title={post.title}
            />
            {/* Faded black overlay on image only */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Faded black overlay
                borderRadius: "15px", // Match border radius of the card
                transition: "background-color 0.3s ease", // Smooth transition
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.2)", // Lighter overlay on hover
                },
              }}
            />
            {/* Creator name and created at */}
            <Box
              sx={{
                position: "absolute",
                top: "10px",
                left: "10px",
                color: "white",
                zIndex: 2, // Ensure text is above overlay
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {post.name}
              </Typography>
              <Typography variant="body2">
                {moment(post.createdAt).fromNow()}
              </Typography>
            </Box>
            {/* Edit button on top of the image */}
            {user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator ? (
              <Button
                onClick={handleEdit}
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  padding: "5px",
                  zIndex: 3, // Ensure button is above the overlay
                }}
              >
                <MoreHoriz />
              </Button>
            ) : null}
          </Box>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom>
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              noWrap
            >
              {post.message.length > 100
                ? `${post.message.substring(0, 100)}...`
                : post.message}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.tags?.map((tag) => `#${tag} `)}
            </Typography>
          </CardContent>
        </ButtonBase>
        <CardActions
          sx={{
            padding: "0 16px 8px 16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleLike}
          >
            <Likes />
          </Button>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <Delete />
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default Post;
