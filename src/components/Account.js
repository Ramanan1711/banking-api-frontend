import React, { useState } from 'react';
import axios from 'axios';

function Account() {
  const [accounts, setAccounts] = useState([]);
  const [accountDetails, setAccountDetails] = useState(null);
  const [newAccount, setNewAccount] = useState({ accountHolderName: '', balance: '' });
  const [updateAccount, setUpdateAccount] = useState({ id: '', accountHolderName: '', balance: '' });
  const [accountId, setAccountId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Helper function to reset messages
  const resetMessages = () => {
    setMessage('');
    setError('');
  };

  // 1. Fetch all accounts
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

  // 2. Fetch account by ID
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

  // 3. Create a new account
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

  // 4. Update an account
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

  // 5. Delete an account
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

  return (
    <div>
      <h3>Account Management</h3>

      {/* Display messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      {/* Fetch all accounts */}
      <div>
        <h4>All Accounts</h4>
        <button onClick={fetchAllAccounts}>Fetch All Accounts</button>
        <ul>
          {accounts.map(account => (
            <li key={account.id}>
              ID: {account.id}, Name: {account.accountHolderName}, Balance: {account.balance}
            </li>
          ))}
        </ul>
      </div>

      {/* Fetch account by ID */}
      <div>
        <h4>Get Account By ID</h4>
        <input
          type="number"
          placeholder="Enter Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        />
        <button onClick={fetchAccountById}>Fetch Account</button>
        {accountDetails && (
          <div>
            <p>ID: {accountDetails.id}</p>
            <p>Name: {accountDetails.accountHolderName}</p>
            <p>Balance: {accountDetails.balance}</p>
          </div>
        )}
      </div>

      {/* Create a new account */}
      <div>
        <h4>Create Account</h4>
        <input
          type="text"
          placeholder="Enter Name"
          value={newAccount.accountHolderName}
          onChange={(e) => setNewAccount({ ...newAccount, accountHolderName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Enter Balance"
          value={newAccount.balance}
          onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
        />
        <button onClick={createAccount}>Create Account</button>
      </div>

      {/* Update an account */}
      <div>
        <h4>Update Account</h4>
        <input
          type="number"
          placeholder="Enter Account ID"
          value={updateAccount.id}
          onChange={(e) => setUpdateAccount({ ...updateAccount, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter Name"
          value={updateAccount.accountHolderName}
          onChange={(e) => setUpdateAccount({ ...updateAccount, accountHolderName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Enter Balance"
          value={updateAccount.balance}
          onChange={(e) => setUpdateAccount({ ...updateAccount, balance: e.target.value })}
        />
        <button onClick={updateExistingAccount}>Update Account</button>
      </div>

      {/* Delete an account */}
      <div>
        <h4>Delete Account</h4>
        <input
          type="number"
          placeholder="Enter Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        />
        <button onClick={deleteAccountById}>Delete Account</button>
      </div>
    </div>
  );
}

export default Account;
