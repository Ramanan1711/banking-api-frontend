import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Card, Box, Grid } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

function Auth() {
  const [registerData, setRegisterData] = useState({ username: '', password: '', role: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState(null);

  // Helper function to reset messages
  const resetMessages = () => {
    setMessage('');
    setError('');
  };

  // 1. Register a new user
  const registerUser = async () => {
    resetMessages();
    const { username, password, role } = registerData;
    if (!username || !password || !role) {
      setError('Please provide username, password, and role.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/auth/register', registerData);
      setMessage(response.data);
      setRegisterData({ username: '', password: '', role: '' });
    } catch (err) {
      setError('Error registering user: ' + err.message);
    }
  };

  // 2. Log in a user
  const loginUser = async () => {
    resetMessages();
    const { username, password } = loginData;
    if (!username || !password) {
      setError('Please provide username and password.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/auth/login', loginData);
      setMessage(response.data);
      const tokenMatch = response.data.match(/Token: (\S+)/);
      if (tokenMatch) setToken(tokenMatch[1]);
      setLoginData({ username: '', password: '' });
    } catch (err) {
      setError('Error logging in: ' + err.message);
    }
  };

  // 3. Fetch user profile
  const fetchUserProfile = async () => {
    resetMessages();
    if (!token) {
      setError('Please log in to fetch the profile.');
      return;
    }
    try {
      const response = await axios.get('http://localhost:8080/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      setMessage('Fetched profile successfully.');
    } catch (err) {
      setError('Error fetching profile: ' + err.message);
    }
  };

  return (
    <Container className="py-8">
      <Typography variant="h4" gutterBottom align="center">Authentication</Typography>

      {/* Display messages */}
      {error && <Typography color="error" align="center" variant="body1">{error}</Typography>}
      {message && <Typography color="primary" align="center" variant="body1">{message}</Typography>}

      {/* Grid Layout for Forms */}
      <Grid container spacing={4} justifyContent="center">
        {/* Register Form */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="p-4 shadow-lg">
            <Typography variant="h5" gutterBottom align="center">Register</Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              className="mb-3"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              className="mb-3"
            />
            <TextField
              label="Role"
              variant="outlined"
              fullWidth
              value={registerData.role}
              onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
              className="mb-3"
            />
            <Button variant="contained" color="primary" fullWidth onClick={registerUser}>
              Register
            </Button>
          </Card>
        </Grid>

        {/* Login Form */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="p-4 shadow-lg">
            <Typography variant="h5" gutterBottom align="center">Login</Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              className="mb-3"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="mb-3"
            />
            <Button variant="contained" color="primary" fullWidth onClick={loginUser}>
              Login
            </Button>
          </Card>
        </Grid>

        {/* Fetch Profile */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="p-4 shadow-lg">
            <Typography variant="h5" gutterBottom align="center">Fetch Profile</Typography>
            <Button variant="contained" color="secondary" fullWidth onClick={fetchUserProfile}>
              Fetch Profile
            </Button>
            {profile && (
              <Box className="mt-3">
                <Typography variant="body1">Username: {profile.username}</Typography>
                <Typography variant="body1">Role: {profile.role}</Typography>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Auth;
