import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/AR Bank Logo.webp';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <Link to="/">
          <img src={logo} alt="AR Bank Logo" style={styles.logo} />
        </Link>
        <span style={styles.logoText}>AR Bank</span>
      </div>
      <div style={styles.navLinks}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/auth" style={styles.navLink}>Auth</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/accounts" style={styles.navLink}>Accounts</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/transactions" style={styles.navLink}>Transactions</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/deposit-withdraw" style={styles.navLink}>Deposit/Withdraw</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/transactions/chart" style={styles.navLink}>Transaction Chart</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/dashboard" style={styles.navLink}>Dashboard</Link> {/* Add Dashboard link */}
        </motion.div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    background: '#1E2A47',
    color: '#fff',
    borderBottom: '2px solid #ccc',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '100px',
    height: '100px',
    marginRight: '15px',
    borderRadius: '50%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#fff',
    letterSpacing: '1px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    marginLeft: '20px',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '500',
    padding: '5px 10px',
    borderRadius: '5px',
    transition: 'background 0.3s ease',
  },
};

export default Navbar;
