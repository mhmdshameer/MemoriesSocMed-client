import { Container, AppBar, Typography, Grow, Grid2 } from "@mui/material";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPost } from "./actions/posts";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <AppBar 
          position="static" 
          color="inherit" 
          sx={{
            borderRadius: 2, 
            margin: '30px 0', 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center'
          }}
        >
          <Grid2 container alignItems="center" spacing={3}>
            <Grid2 item>
              <Typography 
                variant="h2" 
                sx={{ color: 'rgba(0,183,255, 1)' }}
              >
                Memories
              </Typography>
            </Grid2>
            <Grid2 item>
              <img
                src={memories}
                alt="memories"
                height="60"
                width="60"
                style={{ marginLeft: '15px' }}
              />
            </Grid2>
          </Grid2>
        </AppBar>
        <Grow in>
          <Container>
            <Grid2 
              container 
              justifyContent="space-between" 
              alignItems="stretch" 
              spacing={3}
              sx={{
                flexDirection: { xs: 'column-reverse', sm: 'row' }  // Responsive handling here
              }}
            >
              <Grid2 item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid2>
              <Grid2 item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid2>
            </Grid2>
          </Container>
        </Grow>
      </Container>
    </ThemeProvider>
  );
};

export default App;
