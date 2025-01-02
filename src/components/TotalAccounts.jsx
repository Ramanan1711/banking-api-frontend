import React, { useEffect, useState } from 'react';
import { Typography, Paper, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import axios from 'axios';

const TotalAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/accounts');
        setAccounts(response.data); // Assuming API returns a list of accounts
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        borderRadius: '10px',
        background: '#fff',
      }}
    >
      <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
        Total Accounts
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              <TableCell>Account Name</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.accountHolderName}</TableCell>
                <TableCell>{account.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default TotalAccounts;
