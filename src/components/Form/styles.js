import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0.5), // Reduced margin for small devices
        padding: theme.spacing(0.5), // Reduced padding for small devices
      },
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: 'white',
    width: '100%', // Default width for larger screens
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Full width on small devices
      padding: theme.spacing(1), // Less padding on small devices
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column', // Stack elements vertically
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: theme.spacing(1) + '!important',
  },
}));
