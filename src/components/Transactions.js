import React, { useState } from 'react';
import axios from 'axios';

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
    <div style={styles.container}>
      <h3>Transaction History</h3>
      <div style={styles.inputSection}>
        <label htmlFor="accountId" style={styles.label}>Account ID:</label>
        <input
          id="accountId"
          type="number"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          placeholder="Enter Account ID"
          style={styles.input}
        />
        <button onClick={fetchTransactions} style={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Transactions'}
        </button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.transactionList}>
        {loading ? (
          <p style={styles.info}>Fetching transactions, please wait...</p>
        ) : transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.id} style={styles.transactionCard}>
              <p><strong>Amount:</strong> {transaction.amount}</p>
              <p><strong>Type:</strong> {transaction.type}</p>
              <p><strong>Timestamp:</strong> {new Date(transaction.timestamp).toLocaleString()}</p>
            </div>
          ))
        ) : (
          !error && <p style={styles.info}>No transactions found for this account.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  inputSection: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
    cursor: 'not-allowed',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  info: {
    color: '#555',
    marginTop: '10px',
  },
  transactionList: {
    marginTop: '20px',
  },
  transactionCard: {
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
};

export default Transactions;
