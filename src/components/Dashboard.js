import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Typography,
  Paper,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [accountCount, setAccountCount] = useState(null);
  const [monthlyTransactions, setMonthlyTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const accountResponse = await axios.get('http://localhost:8080/accounts/count');
        setAccountCount(accountResponse.data);

        const transactionResponse = await axios.get('http://localhost:8080/transactions/monthly');
        const transactions = transactionResponse.data;

        const groupedData = transactions.reduce((acc, transaction) => {
          const { month, CREDIT, DEBIT } = transaction;

          let monthEntry = acc.find((item) => item.month === month);
          if (!monthEntry) {
            monthEntry = { month, CREDIT: 0, DEBIT: 0 };
            acc.push(monthEntry);
          }

          if (CREDIT !== undefined) {
            monthEntry.CREDIT += CREDIT;
          }
          if (DEBIT !== undefined) {
            monthEntry.DEBIT += DEBIT;
          }

          return acc;
        }, []);

        setMonthlyTransactions(groupedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to fetch dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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
        Dashboard
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Card
              elevation={5}
              style={{
                width: '300px',
                textAlign: 'center',
                padding: '20px',
                borderRadius: '10px',
                background: '#f5f5f5',
                marginRight: '20px',
              }}
            >
              <CardContent>
                <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  Total Accounts
                </Typography>
                <Typography
                  variant="h2"
                  color="primary"
                  style={{ fontWeight: 'bold', cursor: 'pointer' }}
                  component={Link} // Use Link for navigation
                  to="/totalaccounts" // Redirect to TotalAccounts component
                >
                  {accountCount !== null ? accountCount : 'N/A'}
                </Typography>
              </CardContent>
            </Card>
            <Box style={{ width: '100%', maxWidth: '600px', height: '400px' }}>
              <ResponsiveContainer>
                <BarChart data={monthlyTransactions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="CREDIT" fill="#4CAF50" name="Credit" />
                  <Bar dataKey="DEBIT" fill="#F44336" name="Debit" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default Dashboard;
