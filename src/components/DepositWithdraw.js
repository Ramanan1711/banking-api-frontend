import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account ID:</label>
          <input
            type="number"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Transaction Type:</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="credit">Deposit</option>
            <option value="debit">Withdraw</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DepositWithdraw;
