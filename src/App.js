import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Account from './components/Account';
import Transactions from './components/Transactions';
import DepositWithdraw from './components/DepositWithdraw';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import TransactionChart from './components/TransactionChart'; // Import TransactionChart component

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<h1>Welcome to the Banking Application</h1>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/accounts" element={<Account />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/deposit-withdraw" element={<DepositWithdraw />} />
            <Route path="/transactions/chart" element={<TransactionChart />} /> {/* Add chart route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  mainContent: {
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default App;
