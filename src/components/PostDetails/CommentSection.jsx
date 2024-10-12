import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile")); 
  const commentsRef = useRef()

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments)
    setComment('')

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flex: '2',
            height: "200px",
            marginRight: "30px",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} variant="subtitle1" gutterBottom>
               {c}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </Box>
        {user && (
          <div style={{ width: "70%", flex: '1' }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e?.target.value)}
            />
            <Button
              style={{
                marginTop: "10px",
                backgroundColor: comment ? "#4CAF50" : "#9E9E9E", 
                color: "#fff",
                transition: "background-color 0.3s ease",
              }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
            >
              Send
            </Button>
          </div>
        )}
      </Box>
    </div>
  );
};

export default CommentSection;
