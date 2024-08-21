// src/LoginPage.js
import React,{useState} from 'react';
import { Container, TextField, Button, Typography, Box, Avatar, CssBaseline, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios'
import { ToastContainer, toast } from 'react-toastify';



const theme = createTheme();

const LoginPage = ({ setIsAuthenticated }) => {

  const [loginData,setLoginData]=useState({
    email: '',
    password: '',
  })

  const { email, password } = loginData;

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    console.log(loginData)
  };

 
  const [message,setMessage]=useState('')
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', loginData);
      setMessage(res.data.message); // Set success message from the server
      
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        console.log('Token:', res.data.token); // Log the token
        setIsAuthenticated(true);
        // alert('User login');
        toast.success("Login successfully")
        navigate('/');
      }
    } catch (err) {
      setMessage(err.response.data.message); // Set error message from the server
      console.error(err.response.data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 4, marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          {message && <Typography color="red">{message}</Typography>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'secondary.main',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: 'secondary.main',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              autoComplete="current-password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'secondary.main',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: 'secondary.main',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'secondary.main','&:hover': {
                  backgroundColor: '#AA96DA', // Slightly visible background on hover
                }, }}
            >
              Login
            </Button>
            <Typography  align='center'>OR</Typography>
            <Link to='/signup'>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:'transparent', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
               color:'secondary.main', '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)', // Slightly visible background on hover
                },}}
            >
              Create an Account
            </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
