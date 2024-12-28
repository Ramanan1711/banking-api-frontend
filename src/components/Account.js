import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Grid, Box, Paper } from '@mui/material'; // Material-UI
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap

function Account() {
  const [accounts, setAccounts] = useState([]);
  const [accountDetails, setAccountDetails] = useState(null);
  const [newAccount, setNewAccount] = useState({ accountHolderName: '', balance: '' });
  const [updateAccount, setUpdateAccount] = useState({ id: '', accountHolderName: '', balance: '' });
  const [transferDetails, setTransferDetails] = useState({ fromAccountId: '', toAccountId: '', amount: '' });
  const [accountId, setAccountId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const resetMessages = () => {
    setMessage('');
    setError('');
  };

  // Fetch accounts
  const fetchAllAccounts = async () => {
    resetMessages();
    try {
      const response = await axios.get('http://localhost:8080/accounts');
      setAccounts(response.data);
      setMessage('Fetched all accounts successfully.');
    } catch (err) {
      setError('Error fetching accounts: ' + err.message);
    }
  };

  // Fetch account by ID
  const fetchAccountById = async () => {
    resetMessages();
    if (!accountId) {
      setError('Please enter a valid Account ID.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/accounts/${accountId}`);
      setAccountDetails(response.data);
      setMessage(`Fetched account ID ${accountId} successfully.`);
    } catch (err) {
      setError('Error fetching account: ' + err.message);
    }
  };

  // Create a new account
  const createAccount = async () => {
    resetMessages();
    const { accountHolderName, balance } = newAccount;
    if (!accountHolderName || !balance) {
      setError('Please provide account holder name and balance.');
      return;
    }
    try {
      await axios.post('http://localhost:8080/accounts', newAccount);
      setMessage('Account created successfully.');
      setNewAccount({ accountHolderName: '', balance: '' });
      fetchAllAccounts();
    } catch (err) {
      setError('Error creating account: ' + err.message);
    }
  };

  // Update an account
  const updateExistingAccount = async () => {
    resetMessages();
    const { id, accountHolderName, balance } = updateAccount;
    if (!id || !accountHolderName || !balance) {
      setError('Please provide account ID, name, and balance to update.');
      return;
    }
    try {
      await axios.put(`http://localhost:8080/accounts/${id}`, { accountHolderName, balance });
      setMessage(`Account ID ${id} updated successfully.`);
      setUpdateAccount({ id: '', accountHolderName: '', balance: '' });
      fetchAllAccounts();
    } catch (err) {
      setError('Error updating account: ' + err.message);
    }
  };

  // Delete an account
  const deleteAccountById = async () => {
    resetMessages();
    if (!accountId) {
      setError('Please enter a valid Account ID.');
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/accounts/${accountId}`);
      setMessage(`Account ID ${accountId} deleted successfully.`);
      setAccountId('');
      fetchAllAccounts();
    } catch (err) {
      setError('Error deleting account: ' + err.message);
    }
  };

  // Transfer Amount
  const transferAmount = async () => {
    resetMessages();
    const { fromAccountId, toAccountId, amount } = transferDetails;
    if (!fromAccountId || !toAccountId || !amount) {
      setError('Please provide From Account ID, To Account ID, and Amount.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/accounts/transfer', transferDetails);
      setMessage(response.data);
      setTransferDetails({ fromAccountId: '', toAccountId: '', amount: '' });
      fetchAllAccounts();
    } catch (err) {
      setError('Error transferring amount: ' + err.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Account Management
      </Typography>

      {/* Display messages */}
      {error && <Typography color="error" align="center">{error}</Typography>}
      {message && <Typography color="primary" align="center">{message}</Typography>}

      <Grid container spacing={4} mt={3}>

        {/* All Accounts Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={3}>
            <Typography variant="h5" gutterBottom>
              All Accounts
            </Typography>
            <Button variant="contained" color="primary" onClick={fetchAllAccounts} fullWidth>
              Fetch All Accounts
            </Button>
            <Grid container spacing={2} mt={2}>
              {accounts.map(account => (
                <Grid item xs={12} sm={6} md={4} key={account.id}>
                  <Paper elevation={2} padding={2} className="p-3 shadow-sm">
                    <Typography variant="h6">ID: {account.id}</Typography>
                    <Typography variant="body1">Name: {account.accountHolderName}</Typography>
                    <Typography variant="body2">Balance: {account.balance}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Account by ID Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={3}>
            <Typography variant="h5" gutterBottom>
              Get Account By ID
            </Typography>
            <TextField
              label="Account ID"
              type="number"
              fullWidth
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" color="secondary" onClick={fetchAccountById} fullWidth>
              Fetch Account
            </Button>
            {accountDetails && (
              <Box mt={2}>
                <Typography variant="body1">ID: {accountDetails.id}</Typography>
                <Typography variant="body1">Name: {accountDetails.accountHolderName}</Typography>
                <Typography variant="body1">Balance: {accountDetails.balance}</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Create Account Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={3}>
            <Typography variant="h5" gutterBottom>
              Create Account
            </Typography>
            <TextField
              label="Account Holder Name"
              fullWidth
              value={newAccount.accountHolderName}
              onChange={(e) => setNewAccount({ ...newAccount, accountHolderName: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Balance"
              type="number"
              fullWidth
              value={newAccount.balance}
              onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={createAccount} fullWidth>
              Create Account
            </Button>
          </Paper>
        </Grid>

        {/* Update Account Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={3}>
            <Typography variant="h5" gutterBottom>
              Update Account
            </Typography>
            <TextField
              label="Account ID"
              type="number"
              fullWidth
              value={updateAccount.id}
              onChange={(e) => setUpdateAccount({ ...updateAccount, id: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Account Holder Name"
              fullWidth
              value={updateAccount.accountHolderName}
              onChange={(e) => setUpdateAccount({ ...updateAccount, accountHolderName: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Balance"
              type="number"
              fullWidth
              value={updateAccount.balance}
              onChange={(e) => setUpdateAccount({ ...updateAccount, balance: e.target.value })}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={updateExistingAccount} fullWidth>
              Update Account
            </Button>
          </Paper>
        </Grid>

        {/* Delete Account Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={3}>
            <Typography variant="h5" gutterBottom>
              Delete Account
            </Typography>
            <TextField
              label="Account ID"
              type="number"
              fullWidth
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" color="error" onClick={deleteAccountById} fullWidth>
              Delete Account
            </Button>
          </Paper>
        </Grid>

        {/* Transfer Amount Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={3}>
            <Typography variant="h5" gutterBottom>
              Transfer Amount
            </Typography>
            <TextField
              label="From Account ID"
              type="number"
              fullWidth
              value={transferDetails.fromAccountId}
              onChange={(e) => setTransferDetails({ ...transferDetails, fromAccountId: e.target.value })}
              margin="normal"
            />
            <TextField
              label="To Account ID"
              type="number"
              fullWidth
              value={transferDetails.toAccountId}
              onChange={(e) => setTransferDetails({ ...transferDetails, toAccountId: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={transferDetails.amount}
              onChange={(e) => setTransferDetails({ ...transferDetails, amount: e.target.value })}
              margin="normal"
            />
            <Button variant="contained" color="secondary" onClick={transferAmount} fullWidth>
              Transfer Amount
            </Button>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}

export default Account;
