import React from 'react';
import './index.css'; // Import Tailwind CSS file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Account from './components/Account';
import Transactions from './components/Transactions';
import DepositWithdraw from './components/DepositWithdraw';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import TransactionChart from './components/TransactionChart';
import Dashboard from './components/Dashboard'; // Import Dashboard component
import TotalAccounts from './components/TotalAccounts';

import { Container, Typography, Box, Paper } from '@mui/material';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar Component */}
        <Navbar />

        <Container maxWidth="lg" className="py-8">
          {/* Main Content Area */}
          <Box className="bg-white p-6 rounded-lg shadow-lg">
            <Paper className="p-6 rounded-lg shadow-md">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="text-center">
                      <Typography variant="h4" className="font-semibold text-gray-800">
                        Welcome to the Banking Application
                      </Typography>
                    </div>
                  }
                />
                <Route path="/auth" element={<Auth />} />
                <Route path="/accounts" element={<Account />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/deposit-withdraw" element={<DepositWithdraw />} />
                <Route path="/transactions/chart" element={<TransactionChart />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
                <Route path="/totalaccounts" element={<TotalAccounts />} />
              </Routes>
            </Paper>
          </Box>
        </Container>
      </div>
    </Router>
  );
}

export default App;
