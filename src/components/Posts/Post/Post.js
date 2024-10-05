import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import moment from "moment";
import {
  Delete,
  FavoriteBorderOutlined,
  FavoriteBorderRounded,
  MoreHoriz,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const theme = createTheme();

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          {" "}
          <FavoriteBorderRounded fontSize="small" /> &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${
                post.likes.length > 1 ? "s" : ""
              }`}{" "}
        </>
      ) : (
        <>
          <FavoriteBorderOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "like" : "likes"}{" "}
        </>
      );
    }
    return (
      <>
        <FavoriteBorderOutlined fontSize="small" />
        &nbsp; like{" "}
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "15px",
          height: "100%",
          position: "relative",
        }}
      >
        <CardMedia
          sx={{
            height: 0,
            paddingTop: "56.25%", // 16:9 aspect ratio
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "darken",
          }}
          image={post.selectedFile}
          title={post.title}
        />
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "white",
          }}
        >
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "white",
          }}
        >
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHoriz fontSize="default" />
          </Button>
        </div>
        <div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <Typography variant="body2">
            {post.tags?.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography sx={{ padding: "0 16px" }} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
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
            onClick={() => dispatch(likePost(post._id))}
          >
            <Likes />
            
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <Delete />
            Delete
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default Post;
