import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Account from './components/Account';
import Transactions from './components/Transactions';
import DepositWithdraw from './components/DepositWithdraw'; // Import DepositWithdraw component
import Auth from './components/Auth'; // Import Auth component
import logo from './assets/AR Bank Logo.webp'; // Import logo image

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={styles.nav}>
          <div style={styles.logoContainer}>
            <img src={logo} alt="AR Bank Logo" style={styles.logo} /> {/* Display the logo */}
            <span style={styles.logoText}>AR Bank</span> {/* Add the bank name next to the logo */}
          </div>
          <div style={styles.navLinks}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/auth" style={styles.navLink}>Auth</Link> {/* Link to Auth page */}
            <Link to="/accounts" style={styles.navLink}>Accounts</Link>
            <Link to="/transactions" style={styles.navLink}>Transactions</Link>
            <Link to="/deposit-withdraw" style={styles.navLink}>Deposit/Withdraw</Link>
          </div>
        </nav>

        {/* Main Content Area */}
        <div style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<h1>Welcome to the Banking Application</h1>} />
            <Route path="/auth" element={<Auth />} /> {/* Route for Auth component */}
            <Route path="/accounts" element={<Account />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/deposit-withdraw" element={<DepositWithdraw />} /> {/* Route for DepositWithdraw */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    background: '#1E2A47',  // Dark blue background for a premium feel
    color: '#fff',  // White text for contrast
    borderBottom: '2px solid #ccc',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '60px',  // Increased logo size
    height: '60px', // Increased logo size
    marginRight: '15px', // Space between logo and the text
    borderRadius: '50%', // Make logo round if desired
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add subtle shadow for depth
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#fff',
    letterSpacing: '1px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    marginLeft: '20px',
    textDecoration: 'none',
    color: '#fff', // White color for links
    fontSize: '18px',
    fontWeight: '500',
    padding: '5px 10px', // Add padding to make links look more clickable
    borderRadius: '5px', // Round corners for links
    transition: 'background 0.3s ease', // Smooth transition for hover effect
  },
  navLinkHover: {
    background: '#FFB645', // Gold hover effect for premium look
    color: '#333', // Dark text when hovered
  },
  mainContent: {
    padding: '30px',
    backgroundColor: '#f9f9f9', // Light background color for content
    borderRadius: '8px', // Rounded corners for content area
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add subtle shadow for depth
  },
};

// Add hover effect for links
const addHoverEffect = (e) => {
  e.target.style.backgroundColor = '#FFB645';
  e.target.style.color = '#333';
};

const removeHoverEffect = (e) => {
  e.target.style.backgroundColor = '';
  e.target.style.color = '';
};

export default App;
