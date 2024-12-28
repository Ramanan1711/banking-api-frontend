import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Typography, Card, CardContent, Box, Container, Grid } from '@mui/material';

function Transactions() {
  const [accountId, setAccountId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch transactions by account ID
  const fetchTransactions = () => {
    if (!accountId) {
      setError('Please enter a valid Account ID.');
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous errors
    setTransactions([]); // Clear previous transaction data

    axios.get(`http://localhost:8080/transactions/${accountId}`)
      .then(response => {
        setTransactions(response.data);
      })
      .catch(err => {
        setError('Error fetching transactions: ' + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box py={4}>
        <Typography variant="h4" gutterBottom align="center">Transaction History</Typography>

        <Box mb={4}>
          <TextField
            label="Account ID"
            type="number"
            fullWidth
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={fetchTransactions}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Fetch Transactions'}
          </Button>
        </Box>

        {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}

        {loading ? (
          <Typography variant="body1" align="center" color="textSecondary">Fetching transactions, please wait...</Typography>
        ) : (
          <Grid container spacing={2}>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <Grid item xs={12} sm={6} key={transaction.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="p">Amount: {transaction.amount}</Typography>
                      <Typography variant="body1" color="textSecondary">Type: {transaction.type}</Typography>
                      <Typography variant="body1" color="textSecondary">
                        Timestamp: {new Date(transaction.timestamp).toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              !error && <Typography variant="body1" align="center" color="textSecondary">No transactions found for this account.</Typography>
            )}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default Transactions;
