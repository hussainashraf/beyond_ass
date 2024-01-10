// Login.js
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://beyond-ass-i4cq.vercel.app/login', {
        username,
        password,
      });

      if (response.data.success) {
        alert('Login successful!');
        // Redirect or perform other actions upon successful login
        setUser(response.data.user);
        navigate('/dashboard'); // Adjust the redirect path as needed
      } else {
        alert(`Login failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error.message);
      alert('An error occurred during login.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
