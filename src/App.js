import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Account from './components/Account';
import Transactions from './components/Transactions';
import DepositWithdraw from './components/DepositWithdraw'; // Import DepositWithdraw component
import Auth from './components/Auth'; // Import Auth component

function App() {
  return (
    <Router>
      <div>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/auth" style={styles.navLink}>Auth</Link> {/* Link to Auth page */}
          <Link to="/accounts" style={styles.navLink}>Accounts</Link>
          <Link to="/transactions" style={styles.navLink}>Transactions</Link>
          <Link to="/deposit-withdraw" style={styles.navLink}>Deposit/Withdraw</Link>
        </nav>

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
    padding: '10px',
    background: '#f0f0f0',
    borderBottom: '2px solid #ccc',
  },
  navLink: {
    marginRight: '15px',
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
  },
  mainContent: {
    padding: '20px',
  },
};

export default App;
