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
    <div style={styles.container}>
      <h3 style={styles.heading}>Authentication</h3>

      {/* Display messages */}
      {error && <p style={styles.errorMessage}>{error}</p>}
      {message && <p style={styles.successMessage}>{message}</p>}

      <div style={styles.card}>
        <h4>Register</h4>
        <input
          type="text"
          placeholder="Username"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Role"
          value={registerData.role}
          onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
          style={styles.input}
        />
        <button onClick={registerUser} style={styles.button}>Register</button>
      </div>

      <div style={styles.card}>
        <h4>Login</h4>
        <input
          type="text"
          placeholder="Username"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          style={styles.input}
        />
        <button onClick={loginUser} style={styles.button}>Login</button>
      </div>

      <div style={styles.card}>
        <h4>Fetch Profile</h4>
        <button onClick={fetchUserProfile} style={styles.button}>Fetch Profile</button>
        {profile && (
          <div style={styles.profile}>
            <p>Username: {profile.username}</p>
            <p>Role: {profile.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontSize: '16px',
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    fontSize: '16px',
  },
  profile: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#e0f7fa',
    borderRadius: '4px',
    fontSize: '16px',
  },
};

export default Auth;
