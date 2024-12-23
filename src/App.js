import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Account from './components/Account';
import Transactions from './components/Transactions';
import DepositWithdraw from './components/DepositWithdraw'; // Import DepositWithdraw component

function App() {
  return (
    <Router>
      <div>
        <nav style={styles.nav}>
          <Link to="/accounts" style={styles.navLink}>Accounts</Link>
          <Link to="/transactions" style={styles.navLink}>Transactions</Link>
          <Link to="/deposit-withdraw" style={styles.navLink}>Deposit/Withdraw</Link>
        </nav>

        <div style={styles.mainContent}>
          <Routes>
            <Route path="/accounts" element={<Account />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/deposit-withdraw" element={<DepositWithdraw />} /> {/* Route for DepositWithdraw */}
            <Route path="/" element={<h1>Welcome to the Banking Application</h1>} />
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
