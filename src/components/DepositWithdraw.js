import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Alert } from '@mui/material';

function DepositWithdraw() {
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('credit');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that the amount is positive
    if (parseFloat(amount) <= 0) {
      setMessage('Amount must be greater than 0');
      return;
    }

    // Based on the transaction type, call the respective endpoint
    if (transactionType === 'credit') {
      handleDeposit();
    } else if (transactionType === 'debit') {
      handleWithdraw();
    }
  };

  const handleDeposit = () => {
    const depositData = {
      accountId: parseInt(accountId),
      amount: parseFloat(amount),
    };

    // POST request to deposit money
    axios.post('http://localhost:8080/transactions/deposit', depositData)
      .then(response => {
        setMessage('Deposit successful!');
        setAccountId('');  // Clear the form after success
        setAmount('');
      })
      .catch(err => {
        setMessage('Error processing deposit: ' + err.response?.data?.message || err.message);
      });
  };

  const handleWithdraw = () => {
    const withdrawData = {
      accountId: parseInt(accountId),
      amount: parseFloat(amount),
    };

    // POST request to withdraw money
    axios.post('http://localhost:8080/transactions/withdraw', withdrawData)
      .then(response => {
        setMessage('Withdrawal successful!');
        setAccountId('');  // Clear the form after success
        setAmount('');
      })
      .catch(err => {
        setMessage('Error processing withdrawal: ' + err.response?.data?.message || err.message);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">Deposit / Withdraw</Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Account ID"
                type="number"
                fullWidth
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  label="Transaction Type"
                >
                  <MenuItem value="credit">Deposit</MenuItem>
                  <MenuItem value="debit">Withdraw</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        {message && (
          <div className="mt-4">
            {message.includes("Error") ? (
              <Alert severity="error">{message}</Alert>
            ) : (
              <Alert severity="success">{message}</Alert>
            )}
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default DepositWithdraw;
