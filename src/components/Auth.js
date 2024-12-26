import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h3>Authentication</h3>

      {/* Display messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      {/* Register user */}
      <div>
        <h4>Register</h4>
        <input
          type="text"
          placeholder="Username"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={registerData.role}
          onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
        />
        <button onClick={registerUser}>Register</button>
      </div>

      {/* Log in user */}
      <div>
        <h4>Login</h4>
        <input
          type="text"
          placeholder="Username"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button onClick={loginUser}>Login</button>
      </div>

      {/* Fetch profile */}
      <div>
        <h4>Fetch Profile</h4>
        <button onClick={fetchUserProfile}>Fetch Profile</button>
        {profile && (
          <div>
            <p>Username: {profile.username}</p>
            <p>Role: {profile.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
