import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const TransactionChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyTransactions = async () => {
      try {
        // Fetch all transaction data
        const response = await axios.get(`http://localhost:8080/transactions/monthly`);
        const transactions = response.data;

        // Process data for chart
        const groupedData = transactions.reduce((acc, transaction) => {
          const { month, CREDIT, DEBIT } = transaction;

          // Find existing month entry or create a new one if it doesn't exist
          let monthEntry = acc.find(item => item.month === month);
          if (!monthEntry) {
            monthEntry = { month, CREDIT: 0, DEBIT: 0 };
            acc.push(monthEntry);
          }

          // Accumulate amounts based on type
          if (CREDIT !== undefined) {
            monthEntry.CREDIT += CREDIT;
          }
          if (DEBIT !== undefined) {
            monthEntry.DEBIT += DEBIT;
          }

          return acc;
        }, []);

        setData(groupedData);
        setError(null); // Clear previous errors
      } catch (err) {
        console.error("Error fetching monthly transactions:", err);
        setError("Failed to fetch monthly transaction data. Please try again later.");
      }
    };

    fetchMonthlyTransactions();
  }, []);

  return (
    <div>
      <h2>Monthly Transaction Chart</h2>
      {error ? (
        <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="CREDIT" fill="#4CAF50" name="Credit" />
            <Bar dataKey="DEBIT" fill="#F44336" name="Debit" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TransactionChart;
