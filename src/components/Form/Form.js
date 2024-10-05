import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Paper, TextField, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import ImageUploader from "./ImageUploader";

const theme = createTheme();

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [""],
    selectedFile: "",
  });
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: [""],
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(
        createPost({
          ...postData,
          name: JSON.parse(localStorage.getItem("profile"))?.result?.name,
        })
      );
    }
    clear();
  };

  if (!user?.result.name) {
    return (
      <Paper
        sx={{
          padding: theme.spacing(2),
          backgroundColor: "white",
          width: "100%",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            padding: theme.spacing(1),
          },
        }}
      >
        <Typography variant="h6" align="center">
          Please Sign In to create your own memory and like other's memories
        </Typography>
      </Paper>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          padding: theme.spacing(2),
          backgroundColor: "white",
          width: "100%",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            padding: theme.spacing(1),
          },
        }}
      >
        <form
          autoComplete="off"
          noValidate
          sx={{
            "& .MuiTextField-root": {
              margin: theme.spacing(1),
              [theme.breakpoints.down("sm")]: {
                margin: theme.spacing(0.5), // Reduced margin for small devices
                padding: theme.spacing(0.5), // Reduced padding for small devices
              },
            },
          }}
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" align="center">
            {currentId ? "Edit" : "Create"} a memory
          </Typography>

          <TextField
            name="title"
            variant="outlined"
            label="Title"
            sx={{ marginBottom: 2 }}
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            sx={{ marginBottom: 2 }}
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            sx={{ marginBottom: 2 }}
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <ImageUploader setPostData={setPostData} postData={postData} />
          <Button
            sx={{ marginBottom: `${theme.spacing(1)} !important` }} // Adding '!important' like you had
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </ThemeProvider>
  );
};

export default Form;
