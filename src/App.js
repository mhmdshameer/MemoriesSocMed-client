import { Container, AppBar, Typography, Grow, Grid2 } from "@mui/material";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {getPost} from "./actions/posts"
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const App = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(getPost());
  },[])

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>

    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Grid2 container alignItems="center" spacing={3}> {/* Use Grid2 container */}
          <Grid2 item>
            <Typography className={classes.heading} variant="h2">
              Memories
            </Typography>
          </Grid2>
          <Grid2 item>
            <img
              className={classes.image}
              src={memories}
              alt="memories"
              height="60"
              width="60"
            />
          </Grid2>
        </Grid2>
      </AppBar>
      <Grow in>
        <Container>
          <Grid2 container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid2 item xs={12} sm={7}>
              <Posts />
            </Grid2>
            <Grid2 item xs={12} sm={4}>
              <Form />
            </Grid2>
          </Grid2>
        </Container>
      </Grow>
    </Container>
    </ThemeProvider>
  );
};

export default App;
